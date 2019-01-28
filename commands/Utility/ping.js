module.exports = {
  command:"ping",
  description: "Displays the bot's ping",
  syntax: ")>ping",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute:async function(bot, msg, args){
    let botPing = Math.floor(msg.channel.guild.shard.latency);
    await msg.channel.createMessage({embed: {
      color:0x36393E, description: `:satellite_orbital: Took **${botPing}ms** to ping`
    }});
  }
}