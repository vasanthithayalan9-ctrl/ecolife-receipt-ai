import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();
  const features = t('landing.features', { returnObjects: true });

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <p className="mb-4 inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
          {t('landing.intro')}
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
          {t('landing.heading')}
        </h1>
        <p className="mt-6 text-lg text-emerald-100/80">
          {t('landing.description')}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/receipt" className="rounded-full bg-emerald-500 px-6 py-3 font-medium text-white transition hover:bg-emerald-400">
            {t('landing.exploreDemo')}
          </a>
          <a href="/assistant" className="rounded-full border border-emerald-300/40 px-6 py-3 font-medium text-emerald-100 transition hover:bg-emerald-900/40">
            {t('landing.tryVoice')}
          </a>
        </div>
      </div>

      <div className="w-full max-w-xl rounded-3xl border border-emerald-700/50 bg-emerald-950/60 p-8 shadow-2xl shadow-emerald-950/50">
        <h2 className="text-2xl font-semibold">{t('landing.featuresTitle')}</h2>
        <ul className="mt-6 space-y-3 text-emerald-100/80">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
