// A mapping from our short language codes to the BCP 47 codes the Web Speech API expects.
const langCodeMap: { [key: string]: string } = {
    en: 'en-US',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    bn: 'bn-IN',
    mr: 'mr-IN',
    kn: 'kn-IN',
    gu: 'gu-IN',
    pa: 'pa-IN',
    or: 'or-IN', // Note: Odia might not be supported in all browsers
};

/**
 * Speaks an array of text lines using the browser's Speech Synthesis API.
 * It cancels any previously queued speech before starting.
 * @param textLines - An array of strings to be spoken.
 * @param lang - The short language code (e.g., 'en', 'hi').
 */
export const speak = (textLines: string[], lang: string) => {
    if (!('speechSynthesis' in window)) {
        console.warn("Browser does not support Speech Synthesis.");
        return;
    }

    // Stop any speech that is currently active
    window.speechSynthesis.cancel();

    // Combine lines into a single text block for a more natural flow.
    // Replace numbered options with pauses for better cadence.
    const textToSpeak = textLines.join('. ').replace(/(\d:)/g, ' $1 ');

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langCodeMap[lang] || 'en-US';

    // Optional: Try to find a voice that matches the language for better quality.
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === utterance.lang);
    if (voice) {
        utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
};

/**
 * Stops any currently active or queued speech.
 */
export const stopSpeech = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
};
