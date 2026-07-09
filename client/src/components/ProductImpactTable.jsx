import { motion } from 'framer-motion';

import { products as productCatalog } from '../data/products';

function resolveRiskLevel(item) {
  if (item.healthScore < 40 || item.pollutionScore > 70) return 'High';
  if (item.healthScore < 70 || item.pollutionScore > 40) return 'Medium';
  return 'Low';
}

function formatCurrency(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `₹${number}` : '-';
}

function findAlternative(item) {
  const matching = productCatalog.find((product) => product.name.toLowerCase() === String(item.name || '').toLowerCase());
  if (!matching || !matching.alternativeId) return null;
  const alt = productCatalog.find((product) => product.id === matching.alternativeId);
  return alt ? { name: alt.name, healthBenefit: alt.reason, co2Saved: Number(Math.max(0, item.carbonTotal - (alt.carbonFactor || 0) * (item.quantity || 1)).toFixed(1)) } : null;
}

function Badge({ value }) {
  const tone = value === 'Low' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : value === 'Medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-rose-500/30 bg-rose-500/10 text-rose-200';
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

export default function ProductImpactTable({ items = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.06 }}
      className="mt-8 overflow-hidden rounded-[2rem] border border-emerald-700/40 bg-emerald-950/70 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="border-b border-emerald-700/30 p-6">
        <h2 className="text-2xl font-semibold text-white">Product Impact Table</h2>
        <p className="mt-2 text-sm text-emerald-100/70">Detailed product-level comparison with practical better alternatives.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-emerald-700/30 text-left text-sm">
          <thead className="bg-emerald-900/70 text-emerald-200/80">
            <tr>
              {['Product Name','Category','Quantity','Price','Carbon Emission','Health Risk','Pollution Risk','Alternative','CO2 Saved','Health Benefit','Risk Level'].map((heading) => (
                <th key={heading} className="whitespace-nowrap px-4 py-3 font-medium">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-700/20 bg-emerald-950/60 text-emerald-100/80">
            {items.map((item, index) => {
              const alternative = findAlternative(item);
              const riskLevel = resolveRiskLevel(item);
              return (
                <tr key={`${item.name}-${index}`} className="transition hover:bg-emerald-900/60">
                  <td className="px-4 py-3 font-medium text-white">{item.name || 'Unknown'}</td>
                  <td className="px-4 py-3">{item.category || 'Unknown'}</td>
                  <td className="px-4 py-3">{item.quantity || 0}</td>
                  <td className="px-4 py-3">{formatCurrency(item.price)}</td>
                  <td className="px-4 py-3">{`${Number(item.carbonTotal || 0).toFixed(1)} kg`}</td>
                  <td className="px-4 py-3"><Badge value={item.healthScore < 50 ? 'High' : item.healthScore < 70 ? 'Medium' : 'Low'} /></td>
                  <td className="px-4 py-3"><Badge value={item.pollutionScore > 70 ? 'High' : item.pollutionScore > 40 ? 'Medium' : 'Low'} /></td>
                  <td className="px-4 py-3">{alternative?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{alternative?.co2Saved != null ? `${alternative.co2Saved} kg` : 'N/A'}</td>
                  <td className="px-4 py-3">{alternative?.healthBenefit || 'Better option'}</td>
                  <td className="px-4 py-3"><Badge value={riskLevel} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
