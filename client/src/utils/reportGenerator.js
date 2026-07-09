import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { products as productCatalog } from '../data/products';

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function formatCurrency(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 'Rs. 0';
  return `Rs. ${number.toFixed(0)}`;
}

function formatNumber(value, digits = 1) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '0';
  return number.toFixed(digits);
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function findProductByName(name) {
  const normalized = normalizeText(name);
  return productCatalog.find((product) => {
    const productName = normalizeText(product.name);
    return productName === normalized || productName.includes(normalized) || normalized.includes(productName);
  });
}

function buildRecommendations(items = []) {
  return items.reduce((recommendations, item) => {
    const product = findProductByName(item.name);
    if (!product || !product.alternativeId) return recommendations;
    const alternative = productCatalog.find((entry) => entry.id === product.alternativeId);
    if (!alternative) return recommendations;

    const quantity = Number(item.quantity) || 1;
    const currentCarbon = Number(item.carbonTotal || 0);
    const altCarbon = Number(alternative.carbonFactor || 0) * quantity;
    const co2Saved = Number(Math.max(0, currentCarbon - altCarbon).toFixed(1));
    const currentPrice = Number(item.price) || 0;
    const altPrice = Number(alternative.priceEstimate) || 0;
    const costDifference = altPrice * quantity - currentPrice;

    recommendations.push({
      currentProduct: item.name || 'Unknown product',
      alternativeProduct: alternative.name,
      reason: alternative.reason || 'A more sustainable alternative.',
      currentCarbon: formatNumber(currentCarbon),
      alternativeCarbon: formatNumber(altCarbon),
      co2Saved: formatNumber(co2Saved),
      healthBenefit: alternative.healthScore != null ? `Health score may improve to ${alternative.healthScore}` : 'Healthier choice',
      pollutionBenefit: alternative.pollutionScore != null ? `Pollution score may improve to ${alternative.pollutionScore}` : 'Lower pollution impact',
      costNote: costDifference < 0 ? `${formatCurrency(Math.abs(costDifference))} saved` : `${formatCurrency(costDifference)} more`,
      currentPrice: formatCurrency(currentPrice),
      altPrice: formatCurrency(altPrice)
    });

    return recommendations;
  }, []);
}

function pickTopHarmfulProducts(items = [], limit = 5) {
  return [...items]
    .sort((a, b) => Number(b.carbonTotal || 0) - Number(a.carbonTotal || 0))
    .slice(0, limit);
}

function addTextBlock(doc, text, x, y, maxWidth, lineHeight = 14) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(44, 62, 80);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function addPageBreakIfNeeded(doc, y, margin, pageHeight) {
  if (y > pageHeight - margin) {
    doc.addPage();
    return margin;
  }
  return y;
}

export async function generateEcoLifePDF(analysis) {
  const raw = localStorage.getItem('ecolife_analysis');
  const storedAnalysis = safeParse(raw);
  const analysisData = analysis || storedAnalysis;

  if (!analysisData || !Array.isArray(analysisData.items)) {
    window.alert('Please analyze a receipt first.');
    return;
  }

  const items = analysisData.items || [];
  const summary = analysisData.summary || {};
  const totalCarbon = Number(summary.totalCarbon || 0);
  const ecoLifeIndex = Number(summary.ecoLifeIndex || 0) || Math.round((Number(summary.healthScore || 0) + (100 - Number(summary.pollutionScore || 0)) + (100 - Number(summary.plasticScore || 0)) + Math.max(0, 100 - totalCarbon * 10)) / 4);
  const healthScore = Number(summary.healthScore || 0);
  const pollutionScore = Number(summary.pollutionScore || 0);
  const plasticScore = Number(summary.plasticScore || 0);
  const treeEquivalent = Number(summary.treeEquivalent || Math.max(0, Math.round(totalCarbon / 0.4)));
  const cityImpact = analysisData.cityImpact || safeParse(localStorage.getItem('ecolife_city_impact'));
  const habitHistory = safeParse(localStorage.getItem('ecolife_habit_history')) || [];
  const habitSummary = habitHistory.length
    ? {
        entries: habitHistory.length,
        totalCO2Saved: habitHistory.reduce((sum, event) => sum + Number(event.co2Saved || 0), 0),
        averageReduction: habitHistory.length
          ? Number(
              (habitHistory.reduce((sum, event) => sum + Number(event.carbonReduction || 0), 0) / habitHistory.length).toFixed(1)
            )
          : 0
      }
    : null;

  const recommendations = buildRecommendations(items);
  const currentBasket = items.map((item) => ({
    name: item.name || 'Unknown',
    quantity: item.quantity || 0,
    carbon: formatNumber(item.carbonTotal || 0),
    health: item.healthScore != null ? `${item.healthScore}/100` : 'N/A',
    pollution: item.pollutionScore != null ? `${item.pollutionScore}/100` : 'N/A',
    plastic: item.plasticScore != null ? `${item.plasticScore}/100` : 'N/A',
    price: formatCurrency(item.price)
  }));

  const betterBasket = recommendations.map((rec) => ({
    from: rec.currentProduct,
    to: rec.alternativeProduct,
    carbon: rec.alternativeCarbon,
    cost: rec.altPrice,
    benefit: rec.healthBenefit
  }));

  const topHarmful = pickTopHarmfulProducts(items, 5);
  const bestAlternative = recommendations.length ? recommendations[0].alternativeProduct : 'N/A';
  const co2Saved = recommendations.reduce((sum, rec) => sum + Number(rec.co2Saved || 0), 0);

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 40;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let y = margin;
  const contentWidth = pageWidth - margin * 2;

  const qrText = `EcoLife Score: ${ecoLifeIndex}, Total Carbon: ${formatNumber(totalCarbon)} kg, CO2 Saved: ${formatNumber(co2Saved)} kg, Best Alternative: ${bestAlternative}`;
  const qrDataUrl = await QRCode.toDataURL(qrText, { margin: 1, scale: 3 });

  function drawHeader(includeQr = false) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(18, 98, 65);
    doc.text('EcoLife Receipt AI', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Sustainability & Health Impact Report', margin, y + 18);

    if (includeQr) {
      const qrSize = 90;
      doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - qrSize, margin, qrSize, qrSize);
    }

    doc.setDrawColor(18, 98, 65);
    doc.setLineWidth(1);
    doc.line(margin, y + 28, pageWidth - margin, y + 28);
    y += 40;
  }

  function addFooter(pageCount) {
    for (let pageIndex = 1; pageIndex <= pageCount; pageIndex += 1) {
      doc.setPage(pageIndex);
      const footerText = `Page ${pageIndex} of ${pageCount}`;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text(footerText, pageWidth - margin, pageHeight - 18, { align: 'right' });
    }
  }

  function addSection(title) {
    y = addPageBreakIfNeeded(doc, y, margin + 20, pageHeight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(18, 98, 65);
    doc.text(title, margin, y);
    y += 18;
  }

  function addBadge(label, value, x, startY) {
    const badgeHeight = 26;
    const badgeWidth = 140;
    doc.setFillColor(220, 245, 235);
    doc.roundedRect(x, startY - badgeHeight + 4, badgeWidth, badgeHeight, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(18, 98, 65);
    doc.text(label, x + 8, startY - 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(value, x + 8, startY + 8);
  }

  function addBulletList(lines, x, startY, width) {
    let currentY = startY;
    lines.forEach((text) => {
      currentY = addPageBreakIfNeeded(doc, currentY, margin + 20, pageHeight);
      const wrapped = doc.splitTextToSize(`- ${text}`, width);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(44, 62, 80);
      doc.text(wrapped, x, currentY);
      currentY += wrapped.length * 14;
    });
    return currentY;
  }

  function startNewPage() {
    doc.addPage();
    y = margin;
    drawHeader(false);
  }

  drawHeader(true);
  y += 10;

  addBadge('EcoLife Index', `${Math.round(ecoLifeIndex)} percent`, margin, y);
  addBadge('Total CO2', `${formatNumber(totalCarbon)} kg`, margin + 160, y);
  addBadge('Carbon Saved', `${formatNumber(co2Saved)} kg`, margin + 320, y);
  y += 40;

  addSection('Receipt Summary');
  y = addTextBlock(
    doc,
    `Products analyzed: ${items.length}\nTotal CO2 emissions: ${formatNumber(totalCarbon)} kg\nEcoLife Index: ${Math.round(ecoLifeIndex)} percent\nHealth score: ${Math.round(healthScore)} / 100\nPollution score: ${Math.round(pollutionScore)} / 100\nPlastic score: ${Math.round(plasticScore)} / 100\nTree equivalent: ${treeEquivalent} trees\nCO2 saved by recommended swaps: ${formatNumber(co2Saved)} kg`,
    margin,
    y,
    contentWidth
  );
  y += 18;

  addSection('Product Impact Table');
  const tableX = margin;
  const tableWidths = [110, 35, 50, 55, 55, 55, 60];
  const headings = ['Product', 'Qty', 'CO2 kg', 'Health', 'Pollution', 'Plastic', 'Price'];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setFillColor(18, 98, 65);
  doc.setTextColor(255, 255, 255);
  let colX = tableX;
  headings.forEach((heading, index) => {
    doc.rect(colX - 2, y - 10, tableWidths[index] + 4, 16, 'F');
    doc.text(heading, colX, y);
    colX += tableWidths[index];
  });
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(44, 62, 80);

  const addTableRow = (row) => {
    y = addPageBreakIfNeeded(doc, y, margin + 20, pageHeight);
    let currentX = tableX;
    const rowHeights = row.map((cell, index) => doc.splitTextToSize(String(cell), tableWidths[index]).length);
    const rowHeight = Math.max(...rowHeights) * 14;
    row.forEach((cell, index) => {
      const lines = doc.splitTextToSize(String(cell), tableWidths[index]);
      doc.text(lines, currentX, y);
      currentX += tableWidths[index];
    });
    y += rowHeight + 6;
  };

  items.forEach((item) => {
    addTableRow([
      item.name || 'Unknown',
      item.quantity || 0,
      formatNumber(item.carbonTotal || 0),
      item.healthScore != null ? `${item.healthScore}/100` : 'N/A',
      item.pollutionScore != null ? `${item.pollutionScore}/100` : 'N/A',
      item.plasticScore != null ? `${item.plasticScore}/100` : 'N/A',
      formatCurrency(item.price)
    ]);
  });

  y += 8;
  if (y > pageHeight - margin - 120) {
    startNewPage();
  }

  addSection('Top Harmful Products');
  if (topHarmful.length === 0) {
    y = addTextBlock(doc, 'No harmful products identified in this analysis.', margin, y, contentWidth);
  } else {
    topHarmful.forEach((item, index) => {
      y = addPageBreakIfNeeded(doc, y, margin + 20, pageHeight);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(44, 62, 80);
      doc.text(`${index + 1}. ${item.name || 'Unknown'} - ${formatNumber(item.carbonTotal || 0)} kg CO2`, margin, y);
      y += 16;
    });
  }
  y += 8;

  if (y > pageHeight - margin - 120) {
    startNewPage();
  }

  addSection('Smart Recommendations');
  if (recommendations.length === 0) {
    y = addTextBlock(doc, 'No smart recommendations are available for this basket.', margin, y, contentWidth);
  } else {
    recommendations.forEach((recommendation, index) => {
      y = addPageBreakIfNeeded(doc, y, margin + 20, pageHeight);
      const recommendationText = `${index + 1}. Replace ${recommendation.currentProduct} with ${recommendation.alternativeProduct}. Save ${recommendation.co2Saved} kg CO2. ${recommendation.costNote}.`;
      const wrapped = doc.splitTextToSize(recommendationText, contentWidth);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(44, 62, 80);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 14 + 6;
    });
  }
  y += 8;

  if (y > pageHeight - margin - 140) {
    startNewPage();
  }

  addSection('Better Basket Comparison');
  const currentLines = currentBasket.map((item) => `${item.name}, Qty: ${item.quantity}, CO2: ${item.carbon} kg, Price: ${item.price}`);
  const betterLines = betterBasket.length
    ? betterBasket.map((item) => `${item.from} to ${item.to}, CO2: ${item.carbon} kg, Cost: ${item.cost}`)
    : ['No better basket recommendations found.'];

  const leftEnd = addBulletList(currentLines, margin, y, contentWidth / 2 - 10);
  const rightEnd = addBulletList(betterLines, margin + contentWidth / 2 + 10, y, contentWidth / 2 - 10);
  y = Math.max(leftEnd, rightEnd) + 8;

  if (habitSummary) {
    if (y > pageHeight - margin - 120) {
      startNewPage();
    }
    addSection('Green Habit Summary');
    y = addTextBlock(
      doc,
      `Habit entries: ${habitSummary.entries}\nTotal CO2 saved: ${formatNumber(habitSummary.totalCO2Saved)} kg\nAverage reduction: ${formatNumber(habitSummary.averageReduction)} percent`,
      margin,
      y,
      contentWidth
    );
    y += 8;
  }

  if (cityImpact) {
    if (y > pageHeight - margin - 120) {
      startNewPage();
    }
    addSection('City Impact Summary');
    const cityLines = Object.entries(cityImpact).map(([key, value]) => `${key}: ${value}`);
    y = addTextBlock(doc, cityLines.join('\n'), margin, y, contentWidth);
    y += 8;
  }

  if (y > pageHeight - margin - 80) {
    startNewPage();
  }

  addSection('Disclaimer');
  y = addTextBlock(
    doc,
    'Carbon, health, and pollution values are estimated for awareness and decision-support purposes only.',
    margin,
    y,
    contentWidth
  );

  const pageCount = doc.getNumberOfPages();
  addFooter(pageCount);
  doc.save('EcoLife_Sustainability_Report.pdf');
}
