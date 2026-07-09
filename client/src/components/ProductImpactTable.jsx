import { motion } from 'framer-motion';

const rows = [
  {
    name: 'Milk',
    category: 'Dairy',
    quantity: 2,
    price: '₹120',
    carbon: '0.42 kg',
    health: 'Low',
    pollution: 'Medium',
    alternative: 'Local oat milk',
    co2Saved: '0.18 kg',
    healthBenefit: 'Lower saturated fat',
    riskLevel: 'Low'
  },
  {
    name: 'Plastic Bottle',
    category: 'Packaging',
    quantity: 1,
    price: '₹50',
    carbon: '0.34 kg',
    health: 'High',
    pollution: 'High',
    alternative: 'Reusable bottle',
    co2Saved: '0.24 kg',
    healthBenefit: 'Less microplastic exposure',
    riskLevel: 'High'
  },
  {
    name: 'Soft Drink',
    category: 'Beverage',
    quantity: 2,
    price: '₹100',
    carbon: '0.56 kg',
    health: 'High',
    pollution: 'Medium',
    alternative: 'Sparkling water',
    co2Saved: '0.24 kg',
    healthBenefit: 'Lower sugar',
    riskLevel: 'High'
  },
  {
    name: 'Imported Apple',
    category: 'Produce',
    quantity: 3,
    price: '₹180',
    carbon: '0.48 kg',
    health: 'Medium',
    pollution: 'Medium',
    alternative: 'Local apple',
    co2Saved: '0.16 kg',
    healthBenefit: 'Lower transport impact',
    riskLevel: 'Medium'
  }
];

function Badge({ value }) {
  const tone = value === 'Low' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : value === 'Medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-rose-500/30 bg-rose-500/10 text-rose-200';
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

export default function ProductImpactTable() {
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
            {rows.map((row) => (
              <tr key={row.name} className="transition hover:bg-emerald-900/60">
                <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.quantity}</td>
                <td className="px-4 py-3">{row.price}</td>
                <td className="px-4 py-3">{row.carbon}</td>
                <td className="px-4 py-3"><Badge value={row.health} /></td>
                <td className="px-4 py-3"><Badge value={row.pollution} /></td>
                <td className="px-4 py-3">{row.alternative}</td>
                <td className="px-4 py-3">{row.co2Saved}</td>
                <td className="px-4 py-3">{row.healthBenefit}</td>
                <td className="px-4 py-3"><Badge value={row.riskLevel} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
