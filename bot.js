const Telegraf = require('telegraf');
const { bot_key } = require('./vars.json');

const session = require('telegraf/session');
const bot = new Telegraf(bot_key);


bot.use(session())





bot.action(/.+/, (ctx) => {
  ctx.editMessageReplyMarkup(null);
  return ctx.answerCbQuery(`Unrecognized command. Say what?`);
});

bot.catch((err) => {
  console.log('Ooops', err)
});

setImmediate(() => {
  bot.startPolling()
  console.log('Dev SaruBot')
});