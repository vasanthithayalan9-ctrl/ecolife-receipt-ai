import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { voiceLanguages } from '../utils/languageHelpers';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    setLanguage(i18n.language || 'en');
  }, [i18n.language]);

  function handleLanguageChange(targetLanguage) {
    setLanguage(targetLanguage);
    i18n.changeLanguage(targetLanguage);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">{t('settings.title')}</h2>
        <p className="mt-2 text-emerald-100/70">{t('settings.description')}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-800/70 bg-emerald-950/70 p-8">
          <h3 className="text-xl font-semibold text-white">{t('settings.preferencesTitle')}</h3>
          <div className="mt-6 space-y-3">
            <label className="flex items-center justify-between rounded-2xl border border-emerald-800/70 bg-emerald-900/50 px-4 py-3 text-sm text-emerald-100/80">
              <span>{t('settings.enableVoiceGuidance')}</span>
              <input type="checkbox" checked={voiceGuidance} onChange={() => setVoiceGuidance((current) => !current)} className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-emerald-800/70 bg-emerald-900/50 px-4 py-3 text-sm text-emerald-100/80">
              <span>{t('settings.showRecommendations')}</span>
              <input type="checkbox" checked={showRecommendations} onChange={() => setShowRecommendations((current) => !current)} className="h-4 w-4" />
            </label>
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-800/70 bg-emerald-950/70 p-8">
          <h3 className="text-xl font-semibold text-white">{t('settings.languageTitle')}</h3>
          <p className="mt-2 text-sm text-emerald-100/70">{t('settings.languageChoose')}</p>
          <div className="mt-6 grid gap-3">
            {voiceLanguages.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleLanguageChange(option.id)}
                className={`w-full rounded-xl px-4 py-3 font-medium transition ${language === option.id ? 'bg-emerald-500 text-white' : 'border border-emerald-300/40 bg-emerald-950/70 text-emerald-100 hover:bg-emerald-900/60'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
