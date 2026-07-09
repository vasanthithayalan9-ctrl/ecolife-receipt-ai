import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { getSpeechLanguage } from '../utils/languageHelpers';

export default function EcoVoiceBasketAssistant() {
  const { t, i18n } = useTranslation();

  function handleSpeak(text, lang = i18n.language) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      window.alert(t('voice.unsupportedSpeech'));
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLanguage(lang);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.14 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
          <SpeakerWaveIcon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{t('voiceBasket.title')}</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{t('voiceBasket.heading')}</h2>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {[
          { label: t('voiceBasket.readBetterBasket'), text: t('voiceBasket.basketReady') },
          { label: t('voiceBasket.explainSwapsEnglish'), text: t('voiceBasket.swapsEnglish'), lang: 'en' },
          { label: t('voiceBasket.explainSwapsTamil'), text: t('voiceBasket.swapsTamil'), lang: 'ta' },
          { label: t('voiceBasket.askEcoVoice'), text: t('voiceBasket.askEcoVoicePrompt') }
        ].map(({ label, text, lang }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleSpeak(text, lang)}
            className="rounded-full border border-emerald-700/40 bg-emerald-950/70 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-900/90"
          >
            {label}
          </button>
        ))}
      </div>
    </motion.section>
  );
}
