import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();
  const highlights = t('landing.features', { returnObjects: true }) || [
    'Receipt upload and manual bill entry',
    'Carbon emission and health insights',
    'Smarter basket recommendations',
    'Multi-role dashboards and eco voice assistant'
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
            {t('landing.intro')}
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {t('landing.heading')}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-emerald-100/80">
            {t('landing.description')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/scanner" className="rounded-full bg-emerald-500 px-5 py-3 font-medium text-white transition hover:bg-emerald-400">
              {t('landing.exploreDemo')}
            </a>
            <a href="/voice" className="rounded-full border border-emerald-300/40 px-5 py-3 font-medium text-emerald-100 transition hover:bg-emerald-900/40">
              {t('landing.tryVoice')}
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-800/70 bg-emerald-950/70 p-6 shadow-2xl shadow-emerald-950/40">
          <h3 className="text-xl font-semibold text-white">{t('landing.featuresTitle')}</h3>
          <ul className="mt-6 space-y-2 text-sm text-emerald-100/80">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
