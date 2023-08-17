const getTransliterated = require('./transliterate.js');
const botToken = process.env.BOT_TOKEN;
const translateUrl = process.env.TRANSLATE_URL;
const translateHost = process.env.TRANSLATE_HOST;
const translateKey = process.env.TRANSLATE_KEY;


const handler = async (req) => {
  if (!req?.body) {
    return 'Bad Request';
  }

  const body = JSON.parse(req.body);
  const chatId = body?.message?.chat?.id;
  const sentMessage = body?.message?.text;

  if (!chatId || !sentMessage) {
    return 'Bad Request';
  }

  try {
    const response = await fetch(translateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': translateKey,
        'X-RapidAPI-Host': translateHost,
      },
      body: new URLSearchParams({
        source_language: 'ka',
        target_language: 'ru',
        text: getTransliterated(sentMessage),
      }),
    });

    const data = await response.json();

    const telegramRes = JSON.stringify({
      chat_id: chatId,
      text: data.data.translatedText,
    });

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: telegramRes,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.handler = handler;
