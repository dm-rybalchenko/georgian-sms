const langSaved =
  'Language saved successfully. You can send your SMS for translating';

const botInfo = `This bot helps translate georgian SMS

In Georgia, SMS messages are often received written in Georgian, but using Latin letters.
To translate such SMS, you first have to do transliteration.
Then only translate the words into the desired language.

Like this:\`Angarishze xelmisawvdomi nashti\` => \`Aნგარიშზე ხელმისავვდომი ნაშთი\` => \`Accounting for a accessible balance\`

This bot does everything together in one click! Just select your language for translation, then copy SMS, send to the bot and that's it!

Available commands:
/lang - change language
/help - bot info

For translating just send any georgian words in latin layout.
`;

module.exports = { langSaved, botInfo };
