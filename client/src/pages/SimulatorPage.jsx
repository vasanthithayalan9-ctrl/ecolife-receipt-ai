import { useTranslation } from 'react-i18next';

export default function SimulatorPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold">{t('simulator.title')}</h1>
      <p className="mt-3 text-emerald-100/70">{t('simulator.description')}</p>
    </section>
  );
}
