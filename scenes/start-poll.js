const WizardScene = require('telegraf/scenes/wizard');
const Extra = require('telegraf/extra');

const numeral = require('numeral');

const r = require('../questions/questions');
const fn = require('../helpers/fun');
const saveData = require('./save-data');

const fb = require('../helpers/firebase-init');
const fbdb = fb.database().ref().child("lookup");


const startPoll = new WizardScene('start_poll',
  async (ctx) => {
    ctx.session.lastMsg = await ctx.reply(r.a,
      Extra.HTML().markup((m) => m.inlineKeyboard([
        m.callbackButton('Yes', 'q_a:yes'),
        m.callbackButton('No', 'q_a:no')
      ])));
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return ctx.reply(fn.sendSimpleText(ctx, r.err))
    }
    await saveResponseData(ctx, 'b');
    ctx.session.lastMsg = await ctx.reply(r.c + ` If Other please switch keyboard and specify`,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('Telephone'),
        m.callbackButton('In-person interviews'),
        m.callbackButton('Social media polls'),
        m.callbackButton('Google Search Ads'),
        m.callbackButton('Survey platforms')
      ], { columns: 2 }).resize().oneTime()));
    return ctx.wizard.next();

  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return ctx.reply(fn.sendSimpleText(ctx, r.err))
    }
    await saveResponseData(ctx, 'c');
    fn.sendSimpleText(ctx, r.d + ' e.g 100');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx) || !numeral(ctx.message.text).value()) {
      return fn.sendSimpleText(ctx, r.err_num)
    }
    let target = numeral(ctx.message.text).value();
    ctx.session.target = target;
    await saveResponseData(ctx, 'd', target);
    fn.sendSimpleText(ctx, r.e + ' e.g 100');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx) || !numeral(ctx.message.text).value()) {
      return fn.sendSimpleText(ctx, r.err_num)
    }
    let actual = numeral(ctx.message.text).value();
    let target = ctx.session.target + 0;
    await saveResponseData(ctx, 'e', actual);
    delete ctx.session.target;
    if (actual < target) {
      fn.sendSimpleText(ctx, r.f);
      return ctx.wizard.next();
    } else {
      ctx.session.d = true;
      ctx.message.text = `N`;
      ctx.wizard.next();
      return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    }
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    if (!ctx.session.d) {
      await saveResponseData(ctx, 'f');
    }
    delete ctx.session.d;
    fn.sendSimpleText(ctx, r.g);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'g');
    ctx.session.lastMsg = await ctx.reply(r.h,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('Yes'),
        m.callbackButton('No')
      ], { columns: 2 }).resize().oneTime()));
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx) || !(ctx.message.text === 'Yes' || ctx.message.text === 'No')) {
      return fn.sendSimpleText(ctx, r.err)
    }
    ctx.session.offered = (ctx.message.text === 'Yes') ? true : false;
    await saveResponseData(ctx, 'h');
    if (ctx.session.offered) {
      fn.sendSimpleText(ctx, r.i);
      return ctx.wizard.next();
    } else {
      ctx.wizard.selectStep(ctx.wizard.cursor + 2);
      return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    }

  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'i');
    ctx.session.lastMsg = await ctx.reply(r.j + `\n\nWhere\n 1 - Unsuccessful & 5 - Very successful`,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('1'),
        m.callbackButton('2'),
        m.callbackButton('3'),
        m.callbackButton('4'),
        m.callbackButton('5')
      ], { columns: 5 }).resize().oneTime()));
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'j');
    ctx.wizard.next();
    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  },
  async (ctx) => {
    ctx.session.lastMsg = await ctx.reply(r.k,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('Yes'),
        m.callbackButton('Maybe'),
        m.callbackButton('No')
      ], { columns: 5 }).resize().oneTime()));
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx) || !(ctx.message.text === 'Yes' || ctx.message.text === 'No' || ctx.message.text === 'Maybe')) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'k');
    ctx.session.offered = (ctx.message.text === 'Yes' || ctx.message.text === 'Maybe') ? true : false;
    if (ctx.session.offered) {
      fn.sendSimpleText(ctx, r.l);
      return ctx.wizard.next();
    } else {
      ctx.wizard.selectStep(ctx.wizard.cursor + 2);
      return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    }
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'l');
    fn.sendSimpleText(ctx, r.m);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'm');
    ctx.wizard.next();
    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  },
  async (ctx) => {
    ctx.session.lastMsg = await ctx.reply(r.n,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('Yes'),
        m.callbackButton('Maybe'),
        m.callbackButton('No')
      ], { columns: 5 }).resize().oneTime()));
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx) || !(ctx.message.text === 'Yes' || ctx.message.text === 'No' || ctx.message.text === 'Maybe')) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'n');
    ctx.session.offered = (ctx.message.text === 'Yes' || ctx.message.text === 'Maybe') ? true : false;
    if (ctx.session.offered) {
      ctx.session.lastMsg = await ctx.reply(r.o,
        Extra.HTML().markup((m) => m.keyboard([
          m.callbackButton('Ecocash'),
          m.callbackButton('Airtime'),
          m.callbackButton('Paypal'),
          m.callbackButton('Google Search Ads'),
          m.callbackButton('Gisft cards'),
          m.callbackButton('Cryptocurrency (Bitcoin or Etherium)')
        ], { columns: 2 }).resize().oneTime()));
      return ctx.wizard.next();
    } else {
      ctx.wizard.selectStep(ctx.wizard.cursor + 2);
      return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    }
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'o');
    fn.sendSimpleText(ctx, r.p);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return fn.sendSimpleText(ctx, r.err)
    }
    await saveResponseData(ctx, 'p');
    ctx.wizard.next();
    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
  },
  async (ctx) => {
    ctx.session.lastMsg = await ctx.reply(r.q + `\n\nWhere:\n 1 - Unlikely & 10 - Very likely`,
      Extra.HTML().markup((m) => m.keyboard([
        m.callbackButton('1'), m.callbackButton('2'), m.callbackButton('3'),
        m.callbackButton('4'), m.callbackButton('5'), m.callbackButton('6'),
        m.callbackButton('7'), m.callbackButton('8'), m.callbackButton('9'),
        m.callbackButton('10')
      ], { columns: 5 }).resize().oneTime()));
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return ctx.reply(fn.sendSimpleText(ctx, r.err))
    }
    await saveResponseData(ctx, 'q');
    fn.sendSimpleText(ctx, r.r + ' Seperate feature with a fullstop');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return ctx.reply(fn.sendSimpleText(ctx, r.err))
    }
    await saveResponseData(ctx, 'r');
    fn.sendSimpleText(ctx, r.s + ' Enter Next if you are not interested');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!fn.validateText(ctx)) {
      return ctx.reply(fn.sendSimpleText(ctx, r.err))
    }
    await saveResponseData(ctx, 's');

    const data = ctx.session.response;

    await fbdb.child(ctx.chat.id).set(data);

    await fn.sendSimpleText(ctx, `Survey completed, thank you for your time`);

    return ctx.scene.leave();
  })
  .command('cancel', (ctx) => {
    ctx.scene.leave();
    ctx.reply('Survey cancelled, you can restart by Sending the command /start');
  })
  .action('q_a:yes', (ctx) => saveData.qtnA(ctx, 'yes'))
  .action('q_a:no', (ctx) => saveData.qtnA(ctx, 'no'))

module.exports = startPoll;



async function saveResponseData(ctx, level, answer = ctx.message.text) {
  fn.deleteLastMsg(ctx);
  return ctx.session.response.push({
    question: r[level],
    answer
  });
}