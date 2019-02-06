module.exports = {
    command: "setname",
    description: "change bot's username",
    syntax: ")>setname [text]",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        if(!args || args == null) return msg.channel.createMessage("No input")
        args = args.join(" ")
        bot.editSelf({username: args}).then(b => msg.channel.createMessage("Changed Username!")).catch(e => logger.error(e))
    }
}