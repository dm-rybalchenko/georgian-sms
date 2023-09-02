const languages = require('../helpers/keyboard.js');


const botToken = process.env.BOT_TOKEN;

class TelegramService {
  async sendMessage(chatId, message) {
    const telegramBody = {
      chat_id: chatId,
      text: message,
    };

    return await this.#postToChat(telegramBody);
  }

  async sendKeyboard(chatId) {
    const telegramBody = {
      chat_id: chatId,
      text: 'Please, select a language for translating',
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: languages, resize_keyboard: true },
    };

    return await this.#postToChat(telegramBody);
  }

  async #postToChat(tgObj) {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tgObj),
      }
    );

    return await response.json();
  }
}

module.exports = new TelegramService();
