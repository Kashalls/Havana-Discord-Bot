module.exports = {
    command: "clap",
    description: "emphasize your message with some mf claps i stole this command from Ken please pat his head if you see him",
    syntax: ")>clap [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        if(!args[0]) return msg.channel.createMessage("You need to type something.")
        msg.channel.createMessage(args.join(" ").split(" ").join(":clap:"))
    }
}