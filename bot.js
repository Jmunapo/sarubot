const Telegraf = require('telegraf');
const { bot_key } = require('./vars.json');
const Stage = require('telegraf/stage');


const session = require('telegraf/session');
const bot = new Telegraf(bot_key);

bot.use(session());


const startPoll = require('./scenes/start-poll');




const stage = new Stage([
  startPoll
], { ttl: 60 * 60 });

bot.use(stage.middleware())

bot.start(async (ctx) => {
  ctx.scene.enter('start_poll');
});





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