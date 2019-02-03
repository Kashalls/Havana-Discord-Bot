module.exports = {
  command:"test",
  description: "execute commands from Discord",
  syntax: ")>exec [cmds]",
  category: "Developer",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute:async (bot, msg, args, commands, logger, c, s) => {
    msg.channel.getMessageReaction("541426304487260170", "❌").then(r => {
        logger.warning(r)
    })
  }
}