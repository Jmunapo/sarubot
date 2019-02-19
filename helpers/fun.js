const fn = {
  deleteLastMsg: async (ctx) => {
    if (ctx.session.lastMsg) {
      await ctx.deleteMessage(ctx.session.lastMsg.message_id).catch(e => console.log('Error house delete'));
    }
    return true;
  },
  sendSimpleText: async (ctx, message) => {
    ctx.session.lastMsg = await ctx.reply(message)
  },
  validateText: (ctx) => {
    if (!ctx.message || !ctx.message.text) {
      return false;
    }
    return true;
  }
}

module.exports = fn;