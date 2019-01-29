module.exports = {
    command:"restart",
    description: "restart the bot",
    syntax: ")>restart",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        msg.channel.createMessage("Restarting...").then(m => {
            process.exit()
        })
    }
  }