export default function FamilyDashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">FamilyDashboard</h2>
        <p className="mt-2 text-emerald-100/70">Track family habits and greener basket goals.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Weekly purchases', '14'],
          ['Better swaps', '6'],
          ['Family score', '84/100']
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-emerald-800/70 bg-emerald-950/70 p-6">
            <p className="text-sm text-emerald-300">{label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
