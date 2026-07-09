export default function ShopkeeperDashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">ShopkeeperDashboard</h2>
        <p className="mt-2 text-emerald-100/70">Promote sustainable products and compare their impact.</p>
      </div>
      <div className="rounded-3xl border border-emerald-800/70 bg-emerald-950/70 p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Eco products', '24'],
            ['Monthly orders', '312'],
            ['Customer feedback', '4.8/5']
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-emerald-800/70 bg-emerald-900/50 p-4">
              <p className="text-sm text-emerald-300">{label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
