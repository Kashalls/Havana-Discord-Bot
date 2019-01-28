const config = require("../../config.json");
module.exports = {
  command:"bug",
  description: "Send a bug report to the developers",
  syntax: ")>bug",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute:async function(bot, msg, args){
    await msg.channel.createMessage("All bug reports are now reported on our Github page: ")
  }
}
