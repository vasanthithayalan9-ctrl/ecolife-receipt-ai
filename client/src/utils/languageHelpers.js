export const voiceLanguages = [
  { id: 'en', label: 'English', speech: 'en-US' },
  { id: 'ta', label: 'தமிழ்', speech: 'ta-IN' },
  { id: 'hi', label: 'हिन्दी', speech: 'hi-IN' },
  { id: 'te', label: 'తెలుగు', speech: 'te-IN' },
  { id: 'kn', label: 'ಕನ್ನಡ', speech: 'kn-IN' },
  { id: 'ml', label: 'മലയാളം', speech: 'ml-IN' }
];

export function getSpeechLanguage(language) {
  const mapping = voiceLanguages.find((item) => item.id === language);
  return mapping?.speech || 'en-US';
}

export function getSpeechUtterance(text, language) {
  const utterance = new window.SpeechSynthesisUtterance(text);
  const preferredLang = getSpeechLanguage(language);

  let voiceLang = preferredLang;
  const voices = window.speechSynthesis.getVoices();

  if (voices.length > 0) {
    const matchingVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(preferredLang.slice(0, 2).toLowerCase()));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
      voiceLang = matchingVoice.lang;
    } else {
      const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
        voiceLang = englishVoice.lang;
      }
    }
  }

  utterance.lang = voiceLang || 'en-US';
  return utterance;
}
