import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';
import CityImpactHero from '../components/CityImpactHero';
import SimulatorInputPanel from '../components/SimulatorInputPanel';
import CityImpactResults from '../components/CityImpactResults';
import CityBeforeAfterSection from '../components/CityBeforeAfterSection';
import CityMapPlaceholder from '../components/CityMapPlaceholder';
import CityActionPlan from '../components/CityActionPlan';
import EcoVoiceCityNarrator from '../components/EcoVoiceCityNarrator';
import CityReportActions from '../components/CityReportActions';

const initialForm = {
  cityName: 'Chennai',
  numberOfPeople: '10000',
  receiptsPerPersonPerMonth: '4',
  averageCO2SavedPerReceipt: '2.5',
  averagePlasticItemsAvoided: '3',
  averageHealthScoreImprovement: '18'
};

const initialResults = {
  monthlyCO2Reduction: '0 kg CO2',
  yearlyCO2Reduction: '0 kg CO2',
  plasticItemsAvoided: '0 items',
  healthierChoices: '0',
  communityGreenScore: '0/100',
  treeEquivalent: '0 trees',
  airQualityContribution: 'Emerging',
  lifestyleRiskReduction: 'Early improvement'
};

export default function CityImpactPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialForm);
  const [results, setResults] = useState(initialResults);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [loading, setLoading] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setStatusMessage('');
    setStatusType('');
  };

  const formatNumber = (value, digits = 1) => {
    const number = Number(value);
    if (!Number.isFinite(number)) return '0';
    return number.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
  };

  const validateValue = (value, label) => {
    if (value === '' || value === null || value === undefined) {
      throw new Error(`${label} is required.`);
    }
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) {
      throw new Error(`${label} must be a positive number.`);
    }
    return number;
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      setStatusMessage('Calculating city impact...');
      setStatusType('info');

      await new Promise((resolve) => setTimeout(resolve, 250));

      const cityName = String(formValues.cityName || '').trim();
      if (!cityName) {
        throw new Error('City name is required.');
      }

      const numberOfPeople = validateValue(formValues.numberOfPeople, 'Number of people');
      const receiptsPerPersonPerMonth = validateValue(formValues.receiptsPerPersonPerMonth, 'Receipts per person per month');
      const averageCO2SavedPerReceipt = validateValue(formValues.averageCO2SavedPerReceipt, 'Average CO2 saved per receipt');
      const averagePlasticItemsAvoided = validateValue(formValues.averagePlasticItemsAvoided, 'Average plastic items avoided');
      const averageHealthScoreImprovement = validateValue(formValues.averageHealthScoreImprovement, 'Average health score improvement');

      const monthlyReceipts = numberOfPeople * receiptsPerPersonPerMonth;
      const monthlyCO2Reduction = monthlyReceipts * averageCO2SavedPerReceipt;
      const yearlyCO2Reduction = monthlyCO2Reduction * 12;
      const monthlyPlasticItemsAvoided = monthlyReceipts * averagePlasticItemsAvoided;
      const yearlyPlasticItemsAvoided = monthlyPlasticItemsAvoided * 12;
      const healthierChoices = monthlyReceipts;
      const communityGreenScore = Math.min(100, 50 + averageHealthScoreImprovement + averageCO2SavedPerReceipt * 5);
      const treeEquivalent = monthlyCO2Reduction / 21;
      const airQualityContribution = monthlyCO2Reduction > 10000 ? 'High' : monthlyCO2Reduction > 3000 ? 'Moderate' : 'Emerging';
      const lifestyleRiskReduction = averageHealthScoreImprovement >= 20 ? 'Strong improvement' : averageHealthScoreImprovement >= 10 ? 'Moderate improvement' : 'Early improvement';

      const updatedResults = {
        cityName,
        numberOfPeople,
        receiptsPerPersonPerMonth,
        averageCO2SavedPerReceipt,
        averagePlasticItemsAvoided,
        averageHealthScoreImprovement,
        monthlyCO2Reduction: `${formatNumber(monthlyCO2Reduction, 1)} kg CO2`,
        yearlyCO2Reduction: `${formatNumber(yearlyCO2Reduction, 1)} kg CO2`,
        plasticItemsAvoided: `${formatNumber(monthlyPlasticItemsAvoided, 0)} items`,
        healthierChoices: `${formatNumber(healthierChoices, 0)}`,
        communityGreenScore: `${formatNumber(communityGreenScore, 0)}/100`,
        treeEquivalent: `${formatNumber(treeEquivalent, 0)} trees`,
        airQualityContribution,
        lifestyleRiskReduction,
        yearlyPlasticItemsAvoided: `${formatNumber(yearlyPlasticItemsAvoided, 0)} items`
      };

      setResults(updatedResults);
      localStorage.setItem('ecolife_city_impact', JSON.stringify(updatedResults));
      setStatusMessage('City impact calculated successfully.');
      setStatusType('success');
      setCalculated(true);
    } catch (error) {
      setStatusMessage(error?.message || 'Unable to calculate city impact. Please check the input values.');
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  const getSummaryText = () => {
    const summaryLines = [
      `City Impact estimate for ${formValues.cityName || 'the selected city'}`,
      `People: ${formValues.numberOfPeople}`,
      `Receipts per person per month: ${formValues.receiptsPerPersonPerMonth}`,
      `Average CO2 saved per receipt: ${formValues.averageCO2SavedPerReceipt} CO2`,
      `Average plastic items avoided: ${formValues.averagePlasticItemsAvoided}`,
      `Average health score improvement: ${formValues.averageHealthScoreImprovement}`,
      `Monthly CO2 reduction: ${results.monthlyCO2Reduction}`,
      `Yearly CO2 reduction: ${results.yearlyCO2Reduction}`,
      `Plastic items avoided: ${results.plasticItemsAvoided}`,
      `Healthier product choices: ${results.healthierChoices}`,
      `Community Green Score: ${results.communityGreenScore}`,
      `Tree equivalent: ${results.treeEquivalent}`,
      `Air Quality Contribution: ${results.airQualityContribution}`,
      `Lifestyle Risk Reduction: ${results.lifestyleRiskReduction}`
    ];
    return summaryLines.join('\n');
  };

  const handleExport = () => {
    try {
      if (!calculated) {
        window.alert('Please calculate city impact before exporting a report.');
        return;
      }

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      let y = 40;
      const margin = 40;
      const lineHeight = 18;
      const contentWidth = doc.internal.pageSize.width - margin * 2;

      const addLine = (text) => {
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(text, margin, y, { maxWidth: contentWidth });
        y += lineHeight;
      };

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('EcoLife Receipt AI - City Impact Report', margin, y);
      y += 28;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      addLine(`City name: ${formValues.cityName}`);
      addLine(`Number of people: ${formValues.numberOfPeople}`);
      addLine(`Receipts per person per month: ${formValues.receiptsPerPersonPerMonth}`);
      addLine(`Average CO2 saved per receipt: ${formValues.averageCO2SavedPerReceipt} CO2`);
      addLine(`Average plastic items avoided: ${formValues.averagePlasticItemsAvoided}`);
      addLine(`Average health score improvement: ${formValues.averageHealthScoreImprovement}`);
      addLine(`Monthly CO2 reduction: ${results.monthlyCO2Reduction}`);
      addLine(`Yearly CO2 reduction: ${results.yearlyCO2Reduction}`);
      addLine(`Plastic items avoided: ${results.plasticItemsAvoided}`);
      addLine(`Healthier product choices: ${results.healthierChoices}`);
      addLine(`Community Green Score: ${results.communityGreenScore}`);
      addLine(`Tree equivalent: ${results.treeEquivalent}`);
      addLine(`Air Quality Contribution: ${results.airQualityContribution}`);
      addLine(`Lifestyle Risk Reduction: ${results.lifestyleRiskReduction}`);
      y += 10;
      addLine('Disclaimer: City impact values are estimated projections for sustainability awareness and planning.');

      doc.save('EcoLife_City_Impact_Report.pdf');
    } catch (error) {
      window.alert('Unable to generate PDF. Please install jsPDF by running npm install jspdf if needed.');
    }
  };

  const handleShare = async () => {
    try {
      const summaryText = getSummaryText();
      if (navigator.share) {
        await navigator.share({
          title: 'EcoLife City Impact Summary',
          text: summaryText
        });
        setStatusMessage('Share dialog opened.');
        setStatusType('success');
        return;
      }

      await navigator.clipboard.writeText(summaryText);
      setStatusMessage('Summary copied.');
      setStatusType('success');
    } catch (error) {
      setStatusMessage('Unable to share summary. Please copy it manually.');
      setStatusType('error');
    }
  };

  const handleContinue = () => {
    const familyDashboardRouteExists = false;
    if (familyDashboardRouteExists) {
      navigate('/family-dashboard');
    } else {
      window.alert('Family dashboard will be available in the next module.');
    }
  };

  const metrics = [
    { label: 'Monthly CO2 Reduction', value: results.monthlyCO2Reduction },
    { label: 'Yearly CO2 Reduction', value: results.yearlyCO2Reduction },
    { label: 'Plastic Items Avoided', value: results.plasticItemsAvoided },
    { label: 'Healthier Product Choices', value: results.healthierChoices },
    { label: 'Community Green Score', value: results.communityGreenScore },
    { label: 'Tree Equivalent', value: results.treeEquivalent },
    { label: 'Air Quality Contribution', value: results.airQualityContribution },
    { label: 'Lifestyle Risk Reduction', value: results.lifestyleRiskReduction }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <Link to="/results" className="rounded-full border border-emerald-700/40 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          {t('city.backToResults')}
        </Link>
        <Link to="/basket" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400">
          {t('city.viewBetterBasket')}
        </Link>
        <Link to="/family" className="rounded-full border border-emerald-500/30 bg-emerald-950/70 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90">
          {t('city.familyDashboard')}
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">{t('city.title')}</h2>
        <p className="mt-2 text-emerald-100/70">{t('city.description')}</p>
      </div>

      <CityImpactHero />
      <SimulatorInputPanel
        values={formValues}
        onChange={handleInputChange}
        onCalculate={handleCalculate}
        loading={loading}
        statusMessage={statusMessage}
        statusType={statusType}
      />
      <CityImpactResults metrics={metrics} />
      <CityBeforeAfterSection />
      <CityMapPlaceholder />
      <CityActionPlan />
      <EcoVoiceCityNarrator />
      <CityReportActions onExport={handleExport} onShare={handleShare} onContinue={handleContinue} />
    </section>
  );
}
