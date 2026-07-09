import { motion } from 'framer-motion';

const currentBasket = [
  { name: 'Plastic Bottle', quantity: 1, carbon: '0.34 kg', health: 'High', pollution: 'High', price: '₹50' },
  { name: 'Soft Drink', quantity: 2, carbon: '0.56 kg', health: 'High', pollution: 'Medium', price: '₹100' },
  { name: 'Chicken', quantity: 1, carbon: '0.78 kg', health: 'Medium', pollution: 'Medium', price: '₹180' },
  { name: 'Imported Apple', quantity: 3, carbon: '0.48 kg', health: 'Medium', pollution: 'Medium', price: '₹180' }
];

const betterBasket = [
  { name: 'Steel Bottle', quantity: 1, carbon: '0.12 kg', health: 'Low', pollution: 'Low', price: '₹180' },
  { name: 'Fresh Juice', quantity: 2, carbon: '0.24 kg', health: 'Low', pollution: 'Low', price: '₹140' },
  { name: 'Lentils', quantity: 1, carbon: '0.22 kg', health: 'Low', pollution: 'Low', price: '₹120' },
  { name: 'Local Banana', quantity: 3, carbon: '0.16 kg', health: 'Low', pollution: 'Low', price: '₹90' }
];

function Badge({ value }) {
  const tone = value === 'Low' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : value === 'Medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-rose-500/30 bg-rose-500/10 text-rose-200';
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
}

export default function BasketComparisonCards() {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-2">
      {[
        { title: 'Current Basket', items: currentBasket, accent: 'from-rose-500/15 to-orange-500/10' },
        { title: 'Better Basket', items: betterBasket, accent: 'from-emerald-500/15 to-lime-500/10' }
      ].map((group, index) => (
        <motion.article
          key={group.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br ${group.accent} p-6 shadow-[0_20px_70px_rgba(3,20,13,0.2)]`}
        >
          <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
          <div className="mt-5 space-y-3">
            {group.items.map((item) => (
              <div key={item.name} className="rounded-[1.2rem] border border-emerald-700/40 bg-emerald-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-emerald-100/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-300">{item.price}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full border border-emerald-700/40 bg-emerald-900/70 px-2.5 py-1 text-emerald-100/80">CO2: {item.carbon}</span>
                  <Badge value={item.health} />
                  <Badge value={item.pollution} />
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </section>
  );
}
