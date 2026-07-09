import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { voiceLanguages, getSpeechLanguage } from '../utils/languageHelpers';

const options = [
  { id: 'speak', labelKey: 'voice.options.speak' },
  { id: 'upload', labelKey: 'voice.options.upload' },
  { id: 'analyze', labelKey: 'voice.options.analyze' }
];

export default function VoiceAssistant() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('speak');
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState(t('voice.transcriptPlaceholder'));
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus(t('voice.unsupported'));
      return undefined;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = getSpeechLanguage(language);

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index][0].transcript;
        if (event.results[index].isFinal) {
          finalTranscript += result;
        } else {
          interimTranscript += result;
        }
      }

      const spokenText = finalTranscript || interimTranscript || t('voice.listeningStatus');
      setTranscript(spokenText);
      setStatus(finalTranscript ? t('voice.captured', { text: spokenText }) : t('voice.listeningStatus'));
    };

    recognitionInstance.onerror = (event) => {
      setListening(false);
      setStatus(t('voice.error', { error: event.error }));
    };

    recognitionInstance.onend = () => {
      setListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.abort();
    };
  }, [language, t]);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  function handleLanguageChange(targetLanguage) {
    setLanguage(targetLanguage);
  }

  function handleStartListening() {
    if (!recognition) {
      const placeholderText = t('voice.options.' + activeOption).toLowerCase();
      setTranscript(`${t('voice.error', { error: placeholderText })}`);
      setStatus(t('voice.unsupported'));
      return;
    }

    setListening(true);
    setStatus(t('voice.listeningStatus'));
    recognition.lang = getSpeechLanguage(language);
    recognition.start();
  }

  return (
    <>
      <button
        type="button"
        aria-label={t('voice.startListening')}
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500 text-3xl text-white shadow-2xl shadow-emerald-950/40 transition hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        🎤
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(92vw,360px)] rounded-3xl border border-emerald-700/50 bg-emerald-950/95 p-5 text-emerald-50 shadow-2xl shadow-emerald-950/60 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-300">{t('voice.section')}</p>
              <h3 className="mt-1 text-xl font-semibold">{t('voice.heading')}</h3>
            </div>
            <button
              type="button"
              aria-label={t('voice.close')}
              onClick={() => setOpen(false)}
              className="rounded-full border border-emerald-700/50 bg-emerald-900/60 px-3 py-1 text-sm text-emerald-100"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-sm text-emerald-100/75">{t('voice.description')}</p>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/70 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300">{t('voice.optionsTitle', { defaultValue: 'Options' })}</p>
              <div className="mt-3 grid gap-2">
                {options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={activeOption === option.id}
                    onClick={() => setActiveOption(option.id)}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition ${activeOption === option.id ? 'border-emerald-400 bg-emerald-500/20 text-emerald-50' : 'border-emerald-700/50 bg-emerald-950/50 text-emerald-100/80'}`}
                  >
                    {t(option.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/70 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300">{t('voice.language')}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {voiceLanguages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={language === item.id}
                    onClick={() => handleLanguageChange(item.id)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm ${language === item.id ? 'border-emerald-400 bg-emerald-500/20 text-emerald-50' : 'border-emerald-700/50 bg-emerald-950/50 text-emerald-100/80'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/70 p-3">
              <label htmlFor="voice-transcript" className="sr-only">
                {t('voice.transcriptPlaceholder')}
              </label>
              <textarea
                id="voice-transcript"
                value={transcript}
                readOnly
                placeholder={t('voice.transcriptPlaceholder')}
                className="min-h-24 w-full rounded-xl border border-emerald-700/40 bg-emerald-950/70 px-3 py-2 text-sm text-emerald-50 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleStartListening}
              className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              {listening ? t('voice.listening') : t('voice.startListening')}
            </button>

            <p className="text-xs text-emerald-200/70">{status}</p>
          </div>
        </div>
      )}
    </>
  );
}
