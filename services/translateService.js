const getTransliterated = require('../helpers/transliterate.js');


const translateUrl = process.env.TRANSLATE_URL;
const translateHost = process.env.TRANSLATE_HOST;
const translateKey = process.env.TRANSLATE_KEY;

class TranslateService {
  async translateMessage(message, lang) {
    const response = await fetch(translateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': translateKey,
        'X-RapidAPI-Host': translateHost,
      },
      body: new URLSearchParams({
        source_language: 'ka',
        target_language: lang,
        text: getTransliterated(message),
      }),
    });

    const data = await response.json();

    return data.data.translatedText;
  }
}

module.exports = new TranslateService();
