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
