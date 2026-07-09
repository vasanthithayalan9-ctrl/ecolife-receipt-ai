import { useTranslation } from 'react-i18next';

export default function AssistantPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-emerald-700/50 bg-emerald-950/70 p-8">
        <h1 className="text-3xl font-semibold">{t('assistant.title')}</h1>
        <p className="mt-3 text-emerald-100/70">
          {t('assistant.description')}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-full bg-emerald-500 px-6 py-3 font-medium text-white">{t('assistant.english')}</button>
          <button className="rounded-full border border-emerald-300/40 px-6 py-3 font-medium text-emerald-100">{t('assistant.tamil')}</button>
        </div>
      </div>
    </section>
  );
}
