module.exports = {
    command:"owospeak",
    description: "Speak in owo tongue",
    syntax: ")>owospeak [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        let str = args.join(" ")
        let newStr = str.replace(/(l)/g, "w")
        msg.channel.createMessage(newStr)
    }
  }