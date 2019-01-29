module.exports = {
  command:"bug",
  description: "Send a bug report to the developers",
  syntax: ")>bug",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute:async (bot, msg, args, commands, logger, c, s) => {
    await msg.channel.createMessage("All bug reports are now reported on our Github page: https://github.com/TannerReynolds/Havana-Discord-Bot/issues")
  }
}
