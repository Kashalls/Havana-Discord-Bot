module.exports = {
    command:"spoiler",
    description: "sends text for an annoying spoiler version of what you type in",
    syntax: ")>spoiler [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (bot, msg, args, commands, logger, c, s) => {
      args = args.join(" ")
      let chars = args.split("");
      let spoilerd = chars.join("||||")
      if(spoilerd.length > 1987) return msg.channel.createMessage("The spoiler surpassed the 2000 character limit")
      msg.channel.createMessage(`\`\`\`\n||${spoilerd}||\n\`\`\``)
    }
  }