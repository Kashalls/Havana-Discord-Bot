module.exports = {
  command: "invite",
  description: "Get an invite for the bot",
  syntax: ")>invite",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "sendMessages",
  execute:async (bot, msg, args) => {
      msg.channel.createMessage(`https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`)
  }
}