import { useTranslation } from 'react-i18next';
import VoiceAssistant from '../components/VoiceAssistant';

export default function VoiceAssistantPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">{t('voicePage.title')}</h2>
        <p className="mt-2 text-emerald-100/70">{t('voicePage.description')}</p>
      </div>
      <VoiceAssistant />
    </section>
  );
}
