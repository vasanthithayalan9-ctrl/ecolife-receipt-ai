export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Personal dashboard</h1>
      <p className="mt-3 text-emerald-100/70">A premium overview of your receipts, scores, and recommended swaps.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-700/50 bg-emerald-950/70 p-6">
          <p className="text-sm text-emerald-300">Carbon impact</p>
          <p className="mt-3 text-4xl font-semibold">2.4 kg</p>
        </div>
        <div className="rounded-3xl border border-emerald-700/50 bg-emerald-950/70 p-6">
          <p className="text-sm text-emerald-300">Health score</p>
          <p className="mt-3 text-4xl font-semibold">78/100</p>
        </div>
        <div className="rounded-3xl border border-emerald-700/50 bg-emerald-950/70 p-6">
          <p className="text-sm text-emerald-300">Pollution impact</p>
          <p className="mt-3 text-4xl font-semibold">Moderate</p>
        </div>
      </div>
    </section>
  );
}
