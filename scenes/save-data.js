const fn = require('../helpers/fun');
const r = require('../questions/questions');
const Extra = require('telegraf/extra');

const saveD = {
  qtnA: async (ctx, choice) => {
    fn.deleteLastMsg(ctx);
    if (choice === 'no') {
      ctx.reply('Survey completed, thanks for your time');
      return ctx.scene.leave();
    }
    ctx.session.response = [{
      question: r.a,
      answer: choice
    }]
    ctx.session.lastMsg = await ctx.reply(r.b + ` If Other please switch keyboard and specify`,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('Google forms'),
        m.callbackButton('Survey Monkey'),
        m.callbackButton('Typeform'),
        m.callbackButton('SoGoSurvey')
      ], { columns: 2 }).resize().oneTime()));
    return ctx.wizard.next();


  },
  qtnH: async (ctx) => {

  },
  qtnI: async (ctx) => {

  },
  qtnJ: async (ctx) => {

  },
  qtnK: async (ctx) => {

  },
  qtnL: async (ctx) => {

  },
  qtnM: async (ctx) => {

  },
  qtnN: async (ctx) => {

  },
  qtnO: async (ctx) => {

  },
  qtnP: async (ctx) => {

  },
  qtnQ: async (ctx) => {

  },
  qtnR: async (ctx) => {

  },
}

module.exports = saveD;