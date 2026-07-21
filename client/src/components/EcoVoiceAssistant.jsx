import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakerWaveIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';
import { products as productCatalog } from '../data/products';
import { buildApiUrl } from '../utils/api';

const languageOptions = [
  { id: 'en', label: 'English', speech: 'en-US' },
  { id: 'ta', label: 'தமிழ்', speech: 'ta-IN' }
];

function getSpeechLanguage(language) {
  return language === 'ta' ? 'ta-IN' : 'en-US';
}

function getVoiceUtterance(text, language) {
  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.lang = getSpeechLanguage(language);

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const match = voices.find((voice) => voice.lang.toLowerCase().startsWith(utterance.lang.slice(0, 2)));
    if (match) utterance.voice = match;
  }

  return utterance;
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function findProductByName(name) {
  const normalized = normalizeText(name);
  return productCatalog.find((product) => {
    const productName = normalizeText(product.name);
    return productName === normalized || productName.includes(normalized) || normalized.includes(productName);
  });
}

function buildRecommendations(items = []) {
  return items.reduce((recommendations, item) => {
    const matched = findProductByName(item.name);
    if (!matched || !matched.alternativeId) return recommendations;
    const alternative = productCatalog.find((entry) => entry.id === matched.alternativeId);
    if (!alternative) return recommendations;

    const quantity = Number(item.quantity) || 1;
    const currentCarbon = Number(item.carbonTotal || 0);
    const altCarbon = Number(alternative.carbonFactor || 0) * quantity;
    const co2Saved = Number(Math.max(0, currentCarbon - altCarbon).toFixed(1));

    recommendations.push({
      currentProduct: item.name || 'product',
      alternativeProduct: alternative.name,
      co2Saved,
      currentCarbon,
      altCarbon,
      healthScore: item.healthScore || 0,
      pollutionScore: item.pollutionScore || 0,
      plasticScore: item.plasticScore || 0,
      alternativeHealth: alternative.healthScore,
      alternativePollution: alternative.pollutionScore,
      alternativePlastic: alternative.plasticScore
    });

    return recommendations;
  }, []);
}

export default function EcoVoiceAssistant() {
  const [analysis, setAnalysis] = useState(null);
  const [language, setLanguage] = useState('en');
  const [status, setStatus] = useState('Ready to speak.');
  const [listening, setListening] = useState(false);
  const [recognizedQuestion, setRecognizedQuestion] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ecolife_analysis');
      if (!raw) {
        setAnalysis(null);
        return;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.items) || typeof parsed.summary !== 'object') {
        setAnalysis(null);
        return;
      }
      setAnalysis(parsed);
    } catch (error) {
      setAnalysis(null);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    setSpeechSupported('speechSynthesis' in window);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
      recognitionRef.current = null;
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getSpeechLanguage(language);

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.trim();
      setRecognizedQuestion(result);
      setStatus(language === 'ta' ? 'கேள்வி புரிந்துகொண்டுள்ளது. பதிலும் தரப்படுகிறது...' : 'Question heard. Responding now...');
      setListening(false);
      handleQuestionResponse(result);
    };

    recognition.onerror = (event) => {
      setListening(false);
      setStatus(
        language === 'ta'
          ? 'குரல் உள்ளீடு தோல்வியடைந்தது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
          : 'Voice input failed. Please try again.'
      );
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    return () => {
      recognition.abort?.();
    };
  }, [language]);

  const summary = useMemo(() => {
    if (!analysis) return null;
    const items = Array.isArray(analysis.items) ? analysis.items : [];
    const recommendations = buildRecommendations(items);
    const summaryData = analysis.summary || {};
    const totalCarbon = Number(summaryData.totalCarbon || 0).toFixed(1);
    const ecoLifeIndex = Math.round(Number(summaryData.ecoLifeIndex || 0) || Math.round((Number(summaryData.healthScore || 0) + (100 - Number(summaryData.pollutionScore || 0)) + (100 - Number(summaryData.plasticScore || 0)) + Math.max(0, 100 - Number(summaryData.totalCarbon || 0) * 10)) / 4));
    const healthScore = Math.round(Number(summaryData.healthScore || 0));
    const pollutionScore = Math.round(Number(summaryData.pollutionScore || 0));
    const plasticScore = Math.round(Number(summaryData.plasticScore || 0));
    const highestCarbonItem = items.reduce((best, item) => {
      const currentCarbon = Number(item.carbonTotal || 0);
      return currentCarbon > Number(best.carbonTotal || 0) ? item : best;
    }, { carbonTotal: -1 });
    const topCarbonProduct = highestCarbonItem?.name || 'your top product';
    const bestRecommendation = recommendations.length
      ? recommendations.reduce((prev, current) => (Number(current.co2Saved || 0) > Number(prev.co2Saved || 0) ? current : prev), recommendations[0])
      : null;

    return {
      totalCarbon,
      ecoLifeIndex,
      healthScore,
      pollutionScore,
      plasticScore,
      topCarbonProduct,
      bestRecommendation,
      estimatedCO2Saved: bestRecommendation ? Number(bestRecommendation.co2Saved || 0).toFixed(1) : '0'
    };
  }, [analysis]);

  const hasAnalysis = Boolean(summary && analysis);

  async function speakText(text) {
    if (typeof window === 'undefined') {
      setStatus('Your browser does not support voice output.');
      return;
    }

    try {
      setStatus('Generating AI voice...');
      const response = await fetch(buildApiUrl('/api/voice/tts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      if (data?.audioUrl) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        const audio = new Audio(data.audioUrl);
        audioRef.current = audio;
        audio.onended = () => {
          setStatus(language === 'ta' ? 'ஒலி முடிந்தது.' : 'Voice output finished.');
          audioRef.current = null;
        };
        audio.onerror = () => {
          setStatus('Cloud voice playback failed. Using browser voice.');
          audioRef.current = null;
          speakWithBrowser(text);
        };
        await audio.play();
        setStatus(language === 'ta' ? 'ஒலி வாசிக்கிறேன்...' : 'Speaking now...');
        return;
      }

      throw new Error('Invalid TTS response');
    } catch (error) {
      if (speechSupported && 'speechSynthesis' in window) {
        setStatus('Cloud voice unavailable. Using browser voice.');
        speakWithBrowser(text);
      } else {
        setStatus('Cloud voice unavailable and browser voice unsupported.');
      }
    }
  }

  function speakWithBrowser(text) {
    try {
      const utterance = getVoiceUtterance(text, language);
      utterance.onend = () => {
        setStatus(language === 'ta' ? 'ஒலி முடிந்தது.' : 'Voice output finished.');
      };
      utterance.onerror = () => {
        setStatus(language === 'ta' ? 'ஒலி வழங்கலில் பிழை ஏற்பட்டது.' : 'Voice playback failed.');
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setStatus(language === 'ta' ? 'ஒலி வாசிக்கிறது...' : 'Speaking now...');
    } catch (error) {
      setStatus(language === 'ta' ? 'ஒலி வெளியீட்டு சேவையில் பிழை.' : 'Voice output service error.');
    }
  }

  function handleReadReport() {
    if (!hasAnalysis) {
      setStatus('Analyze a receipt first to use EcoVoice AI.');
      return;
    }

    const englishText = `Your receipt has been analyzed. Your total carbon emission is ${summary.totalCarbon} kg CO2. Your EcoLife Index is ${summary.ecoLifeIndex}. Your health score is ${summary.healthScore}. Your pollution score is ${summary.pollutionScore}. The highest carbon product is ${summary.topCarbonProduct}. Replacing ${summary.bestRecommendation?.currentProduct || summary.topCarbonProduct} with ${summary.bestRecommendation?.alternativeProduct || 'a better alternative'} can save about ${summary.estimatedCO2Saved} kg CO2.`;
    const tamilText = `உங்கள் ரசீது பகுப்பாய்வு முடிந்தது. மொத்த கார்பன் வெளியேற்றம் ${summary.totalCarbon} கிலோ CO2. அதிக கார்பன் உருவாக்கும் பொருள் ${summary.topCarbonProduct}. ${summary.bestRecommendation?.currentProduct || summary.topCarbonProduct}-க்கு பதிலாக ${summary.bestRecommendation?.alternativeProduct || 'மாற்று பொருள்'} தேர்வு செய்தால் சுமார் ${summary.estimatedCO2Saved} கிலோ CO2 குறைக்கலாம்.`;

    speakText(language === 'ta' ? tamilText : englishText);
  }

  function handleExplainTopCarbonProduct() {
    if (!hasAnalysis) {
      setStatus('Analyze a receipt first to use EcoVoice AI.');
      return;
    }

    const englishText = `Your highest carbon product is ${summary.topCarbonProduct}. This product contributes the most to your total carbon emissions and is a good place to start reducing your footprint.`;
    const tamilText = `அதிக கார்பன் உருவாக்கும் பொருள் ${summary.topCarbonProduct}. இது உங்கள் மொத்த கார்பன் வெளியேற்றத்திற்கு அதிக முக்கியத்துவம் கொண்டது மற்றும் உங்கள் பாதிப்பை குறைக்க இந்த பொருளை முதலில் கவணிக்கலாம்.`;
    speakText(language === 'ta' ? tamilText : englishText);
  }

  function handleExplainBestAlternative() {
    if (!hasAnalysis || !summary.bestRecommendation) {
      setStatus('Analyze a receipt first to use EcoVoice AI.');
      return;
    }

    const englishText = `The best recommended alternative is ${summary.bestRecommendation.alternativeProduct} for ${summary.bestRecommendation.currentProduct}. It can save about ${summary.estimatedCO2Saved} kg CO2 while improving the overall environmental impact.`;
    const tamilText = `மிகச்சிறந்த மாற்று ${summary.bestRecommendation.alternativeProduct} ஆகும் ${summary.bestRecommendation.currentProduct}-க்கு. இது சுமார் ${summary.estimatedCO2Saved} கிலோ CO2 சேமிக்கும் மற்றும் சுற்றுச்சூழல் பாதிப்பை மேம்படுத்தும்.`;
    speakText(language === 'ta' ? tamilText : englishText);
  }

  function handleQuestionResponse(question) {
    if (!hasAnalysis) {
      setStatus('Analyze a receipt first to use EcoVoice AI.');
      return;
    }

    const normalized = normalizeText(question);
    const topProduct = summary.topCarbonProduct;
    const bestAlt = summary.bestRecommendation?.alternativeProduct || 'a better alternative';
    const saved = summary.estimatedCO2Saved;

    if (normalized.includes('carbon') || normalized.includes('கார்பன்')) {
      const englishText = `Your total carbon emission is ${summary.totalCarbon} kg CO2. Your highest carbon product is ${topProduct}. Choosing a better alternative like ${bestAlt} can save about ${saved} kg CO2.`;
      const tamilText = `உங்கள் மொத்த கார்பன் வெளியேற்றம் ${summary.totalCarbon} கிலோ CO2. அதிக கார்பன் உருவாக்கும் பொருள் ${topProduct}. ${bestAlt} தேர்வு செய்தால் சுமார் ${saved} கிலோ CO2 குறைக்கலாம்.`;
      speakText(language === 'ta' ? tamilText : englishText);
      return;
    }

    if (normalized.includes('health') || normalized.includes('ஆரோக்கியம்')) {
      const englishText = `Your health score is ${summary.healthScore} out of 100. Healthier food choices in your basket can improve this score and support a better lifestyle.`;
      const tamilText = `உங்கள் ஆரோக்கிய மதிப்பெண் 100 இலிருந்து ${summary.healthScore}. உங்கள் இதய ஆரோக்கியம் மற்றும் உடல் நலம் மேம்பட சீரமைக்கப்பட்ட உணவுப் பொருட்களை தேர்வுசெய்யலாம்.`;
      speakText(language === 'ta' ? tamilText : englishText);
      return;
    }

    if (normalized.includes('alternative') || normalized.includes('மாற்று')) {
      const englishText = `The best recommended alternative is ${bestAlt}. It is suggested to replace ${summary.bestRecommendation?.currentProduct || topProduct} and can help reduce emissions and improve health impact.`;
      const tamilText = `மிகச்சிறந்த மாற்று ${bestAlt}. இது ${summary.bestRecommendation?.currentProduct || topProduct}-ஐ மாற்ற பரிந்துரைக்கப்படுகிறது மற்றும் இது வெளியேற்றத்தை குறைத்து ஆரோக்கிய தாக்கத்தை மேம்படுத்த உதவும்.`;
      speakText(language === 'ta' ? tamilText : englishText);
      return;
    }

    if (normalized.includes('plastic') || normalized.includes('பிளாஸ்டிக்')) {
      const englishText = `Your plastic impact score is ${summary.plasticScore} out of 100. Choosing items with less packaging and reusable alternatives can lower plastic waste.`;
      const tamilText = `உங்கள் பிளாஸ்டிக் தாக்க மதிப்பெண் ${summary.plasticScore} / 100. குறைந்த பொதிகை மற்றும் மீண்டும் பயன்படுத்தக்கூடிய தேர்வுகளை எடுத்துக்கொள்வது பிளாஸ்டிக் கழிவை குறைக்கும்.`;
      speakText(language === 'ta' ? tamilText : englishText);
      return;
    }

    const englishText = `For eco-friendly shopping, choose seasonal produce, local foods, and lower carbon alternatives. Avoid single-use plastic packaging and prefer whole foods.`;
    const tamilText = `சுற்றுச்சூழலுக்கு உகந்த வணிகத்திற்கு, பருவப் பண்டங்களை, உள்ளூர் உணவுகளை மற்றும் குறைந்த கார்பன் மாற்றுகளைத் தேர்ந்தெடுக்கவும். ஒரே முறை பயன்படுத்தும் பிளாஸ்டிக் பொதிகளை தவிர்க்கவும்.`;
    speakText(language === 'ta' ? tamilText : englishText);
  }

  function handleListenQuestion() {
    if (!speechRecognitionSupported) {
      setStatus('Voice input is not supported in this browser. You can still use voice output.');
      return;
    }

    const recognition = recognitionRef.current;
    if (!recognition) {
      setStatus('Voice input is not supported in this browser. You can still use voice output.');
      return;
    }

    try {
      recognition.lang = getSpeechLanguage(language);
      recognition.start();
      setListening(true);
      setStatus(language === 'ta' ? 'கேள்விக்காக கேட்கப்படுகிறது...' : 'Listening for your question...');
    } catch (error) {
      setListening(false);
      setStatus(language === 'ta' ? 'குரல் உள்ளீடு துவக்க முடியவில்லை.' : 'Unable to start voice input.');
    }
  }

  function handleStopVoice() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setListening(false);
    setStatus(language === 'ta' ? 'ஒலி நிறுத்தப்பட்டது.' : 'Voice stopped.');
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.14 }}
      className="mt-8 rounded-[2rem] border border-emerald-700/40 bg-gradient-to-br from-emerald-950/90 to-emerald-900/80 p-8 shadow-[0_20px_70px_rgba(3,20,13,0.2)]"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300">
            <SpeakerWaveIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">EcoVoice AI</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">EcoVoice Assistant</h2>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/75">
              {hasAnalysis
                ? 'Hear your report, get smart alternatives, and ask quick eco questions using voice.'
                : 'Analyze a receipt first to use EcoVoice AI.'}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {languageOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setLanguage(option.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${language === option.id ? 'border-emerald-400 bg-emerald-500/20 text-white' : 'border-emerald-700/40 bg-emerald-950/70 text-emerald-100/80'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <button
          type="button"
          onClick={handleReadReport}
          disabled={!hasAnalysis}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SpeakerWaveIcon className="h-5 w-5" />
          Read My Report
        </button>
        <button
          type="button"
          onClick={handleExplainTopCarbonProduct}
          disabled={!hasAnalysis}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MicrophoneIcon className="h-5 w-5" />
          Explain Top Carbon Product
        </button>
        <button
          type="button"
          onClick={handleExplainBestAlternative}
          disabled={!hasAnalysis}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SpeakerWaveIcon className="h-5 w-5" />
          Explain Best Alternative
        </button>
        <button
          type="button"
          onClick={handleListenQuestion}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90"
        >
          <MicrophoneIcon className="h-5 w-5" />
          Listen to My Question
        </button>
        <button
          type="button"
          onClick={handleStopVoice}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-950/70 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900/90"
        >
          <StopIcon className="h-5 w-5" />
          Stop Voice
        </button>
      </div>

      {!speechRecognitionSupported && (
        <div className="mt-6 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
          Voice input is not supported in this browser. You can still use voice output.
        </div>
      )}

      <div className="mt-6 rounded-3xl border border-emerald-700/40 bg-emerald-950/70 p-4 text-sm text-emerald-100/80">
        <div className="flex items-center gap-2 text-emerald-300">
          <MicrophoneIcon className="h-4 w-4" />
          <span className="font-semibold">Status</span>
        </div>
        <p className="mt-2">{status}</p>
        {recognizedQuestion && (
          <p className="mt-2 text-emerald-200">Recognized question: “{recognizedQuestion}”</p>
        )}
      </div>
    </motion.section>
  );
}
