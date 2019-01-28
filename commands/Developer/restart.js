module.exports = {
    command:"restart",
    description: "restart the bot",
    syntax: ")>restart",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async function(bot, msg, args){
        msg.channel.createMessage('Restarting...').then(m => {
            process.exit()
        })
    }
  }