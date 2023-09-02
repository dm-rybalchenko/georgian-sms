const DBService = require('./services/dataBaseService.js');
const TGService = require('./services/telegramService.js');
const TranslateService = require('./services/translateService.js');
const { botInfo, langSaved } = require('./helpers/messages.js');


const createRes = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify({ message }),
});

const handler = async (event) => {
  const message = event?.text?.trim();
  const lang = event?.lang;
  const id = event?.chatId;

  try {
    if (lang) {
      await DBService.updateItem(id, lang);
      await TGService.sendMessage(id, langSaved);

      return createRes(200, 'Success');
    }

    const user = await DBService.getItemById(id);

    if (message === '/help') {
      await TGService.sendMessage(id, botInfo);

    } else if (user && message && message !== '/start' && message !== '/lang') {
      const translated = await TranslateService.translateMessage(
        message,
        user.lang
      );
      await TGService.sendMessage(id, translated);

    } else {
      await TGService.sendKeyboard(id);
    }

    return createRes(200, 'Success');
  } catch (e) {
    console.log('Server Error', e);

    return createRes(500, 'Server Error ' + e);
  }
};

exports.handler = handler;
