// Constants
const c = require("./config.json"), // Holds all sensitive tokens/passwords/etc.
      fs = require("fs"),
      Eris = require("eris"),
      bot = new Eris(c.token, { maxShards: c.shardCount, getAllUsers: true, disableEveryone: false, defaultImageFormat: "png" }),
      s = require("snekfetch"),
      cmdPrefix = c.prefix,
      handler = require("recursive-readdir"), // Used to recursively get cmd files from folders
      guildStatus = require("./util/guildInfo.js"),
      modlogs = require("./util/modLogs.js"),
      logger = require("./util/logger.js"); // Custom logger


let botInit = new Date(), pref = cmdPrefix, mentionPrefRegex = /<@(!)?403854965191344139>/;

/* Discord command definitions
/ Recursively goes through the commands folder and all sub folders to find command files
/ then pushes each file to the arrays below  */
let commandLocations = [];
let commands = [];
handler("./commands/", (err, files) => {
  for(i = 0; i < files.length; i++) {
      if(files[i].endsWith(".js")) {
        let file = `./${files[i]}`
        delete require.cache[require.resolve(file)];
        commandLocations.push(file)
        commands.push(require(file))
      }
  }
});


bot.on("ready", () => {

  // Initial logs
  let readyTime = new Date(), startTime = Math.floor((readyTime - botInit) / 1000);
  logger.success(`  _____                          |> Online.`);
  logger.success(` |_   _|____   _ _   _ _   _     |> ${bot.guilds.size} servers connected`);
  logger.success(`   | ||_  / | | | | | | | | |    |> ${bot.users.size} users`);
  logger.success(`   | | / /| |_| | |_| | |_| |    |> ${bot.shards.size} shards connected`);
  logger.success(`   |_|/___|\\__,_|\\__, |\\__,_|    |> ${commands.length} commands loaded`);
  logger.success(`                 |___/           |> Took ${startTime} seconds to start`);
  logger.success(`_______________________________________________________________________\n\n`);

  // Setting bot status
  bot.editStatus("online", {
    name: c.playing,
    type: 0
  });
}); // End of ready event


bot.on("guildCreate", guild => {
    logger.success(`Guild Joined! Now at ${bot.guilds.size}`);
    guildStatus.update(bot,guild,true); // Sends guild join log to monitor channel
}); 

bot.on("guildDelete", guild => {
    logger.success(`Guild Left. Now at ${bot.guilds.size}`);
    guildStatus.update(bot,guild,false); // Sends guild leave log to monitor channel
});

bot.on("guildMemberAdd", async (guild, member) => {
  if (c.modLogs.enabled === true) {
    modlogs.memberJoin(bot, guild, member, c.modLogs.channel); // Sends mod log to guild's mod-log channel
  }
  if(c.welcomer.enabled === true) {
    //welcomer.generate(bot, guild, member, c.welcomer.channel); // Generating welcome message for new users
  }
  if(c.autoRole.enabled === true) {
    roleID = guild.roles.filter(r => r.name === c.autoRole.roleName)[0].id;
    guild.addMemberRole(member.id, roleID).catch(e => {
      return console.log(e)
    });
  }
  if(c.autoNick.enabled === true) {
    member.edit({nick: c.autoNick.nickname}).catch(e => {
      return console.log(e);
    })
  }
}) 

bot.on("guildMemberRemove", async (guild, member) => {
  if (c.modLogs.enabled === true) {
    modlogs.memberLeave(bot, guild, member, c.modLogs.channel);
  }
})

bot.on("messageDelete", async msg => {
  if(c.modLogs.enabled === true) {
    modlogs.msgDeleteLog(bot, msg, c.modLogs.channel)
  }
});

bot.on("messageUpdate", async (msg, oldMsg) => {

  // Stop people from editing ads into their messages
  if(c.adblock.enabled === true) {
    if(msg.content.match(/\b(?:https?:\/\/)?discord(?:app)?\.(?:com\/invite\/|gg)+\/*([A-Za-z_0-9]+)/g)) {
      let mod = msg.channel.permissionsOf(msg.author.id).has("banMembers");
      let canDelete = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
      if(mod) return;
      if(!canDelete) return;
      msg.delete().then(m => {
        msg.channel.createMessage(`<@${msg.author.id}> Please do not post invite links again.`)
      })
    } 
  }
  if(c.linkBlocking.enabled === true) {
    if(c.linkBlocking.channels.includes(msg.channel.id)) {
      if(msg.content.match(/\bhttps?:\/\/\S+/i)) {
        let manageMessages = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
        let moderator = msg.channel.permissionsOf(msg.author.id).has("banMembers")
        if(moderator) return;
        if(!manageMessages) return;
        msg.delete().then(m => {
          msg.channel.createMessage(`Sorry <@${msg.author.id}>, all links have been blocked in this channel by an administrator`)
        })
      }
    }
  }
});

bot.on("guildBanAdd", async (guild, user) => {
  if (c.modLogs.enabled === true) {
    modlogs.banAdd(bot, guild, user, c.modLogs.channel);
  }
});

bot.on("guildBanRemove", async (guild, user) => {
  if (c.modLogs.enabled === true) {
    modlogs.banRemove(bot, guild, user, c.modLogs.channel);
  }
});

// Sets for command cooldowns
let masscmds = new Set();
let othercmds = new Set();

// Msg event
bot.on("messageCreate", async msg => {

  // Will not do anything if the author is a bot, or if the bot does not have perms to send messages
  if(msg.author.bot) return;
  let sendMessages = msg.channel.permissionsOf(bot.user.id).has("sendMessages");
  let embedLinks = msg.channel.permissionsOf(bot.user.id).has("embedLinks");
  if(!sendMessages) return;
  if(!embedLinks) msg.channel.createMessage("This bot requires the `embedLinks`/`attachFiles` permissions in order for all of it's functions to work properly")

  // Checking to see if channel is a poll channel
  if(c.pollChannel.enabled === true && c.pollChannel.channel === msg.channel.id) {
    msg.addReaction("✅")
    msg.addReaction("❌")
  }

  // Checking to see if channel has links blocked
  if(c.linkBlocking.enabled === true) {
    if(c.linkBlocking.channels.includes(msg.channel.id)) {
      if(msg.content.match(/\bhttps?:\/\/\S+/i)) {
        let manageMessages = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
        let moderator = msg.channel.permissionsOf(msg.author.id).has("banMembers")
        if(moderator) return;
        if(!manageMessages) return;
        msg.delete().then(m => {
          msg.channel.createMessage(`Sorry <@${msg.author.id}>, all links have been blocked in this channel by an administrator`)
        })
      }
    }
  }

  // Checking to see if ads are blocked for that guild
  if(c.adblock.enabled === true) {
    if(msg.content.match(/\b(?:https?:\/\/)?discord(?:app)?\.(?:com\/invite\/|gg)+\/*([A-Za-z_0-9]+)/g)) {
      let mod = msg.channel.permissionsOf(msg.author.id).has("banMembers");
      let canDelete = msg.channel.permissionsOf(bot.user.id).has("manageMessages");
      if(mod) return;
      if(!canDelete) return;
      msg.delete().then(m => {
        msg.channel.createMessage(`<@${msg.author.id}> Please do not post invite links again.`)
      })
    }
  }

  // Reload function for commands
  if(msg.content === `${pref}rl` && c.devs.includes(msg.author.id)) {
      commandLocations = [];
      commands = [];
      handler("./commands/", (err, files) => {
        for(i = 0; i < files.length; i++) {
            if(files[i].endsWith(".js")) {
              let file = `./${files[i]}`
              delete require.cache[require.resolve(file)];
              commandLocations.push(file)
              commands.push(require(file))
            }
        }
    })
    return msg.channel.createMessage("Reloaded Commands")
  }

  // Checking to see if the bot is mentioned
  let mentionPref = pref
  if(msg.content.match(mentionPrefRegex)) {
    mentionPref = msg.content.match(mentionPrefRegex)[0]
  }

  // Command handling
  if(msg.content.indexOf(pref) !== 0 && msg.content.indexOf(mentionPref) !== 0) return;
  if(msg.content.startsWith(mentionPref)) {
    executeCmd(mentionPref);
  } else {
    executeCmd(pref);
  }

  // Function used to actually execute commands
  async function executeCmd(thePrefix) {

    // Defining args and command
    const args = msg.content.slice(thePrefix.length).trim().split(/ +/g);
    const command = args.shift().toString().toLowerCase();

    // Cycling through commands to find a match
    for(i=0;commands.length>i;i++){
      if(commands[i].command == command){

        // Checking for category-specific requirements
        if(commands[i].category === "Developer" && !c.devs.includes(msg.author.id)) return msg.channel.createMessage("You must be a developer to use this command");
        
        // Checking to see if the author and bot actually have permissions to execute this command effectively
        let perms = msg.channel.permissionsOf(msg.author.id).has(commands[i].permission) && msg.channel.permissionsOf(bot.user.id).has(commands[i].botPermission);
        if(!perms && !c.devs.includes(msg.author.id)) return msg.channel.createMessage(`You require the \`${commands[i].permission}\` permission, and the bot requires the \`${commands[i].botPermission}\` permission.`)
        
        // if command is a mass command to add/remove/respond to cooldown. Mass cooldown is an hour
        if(commands[i].command.startsWith("mass")) {
          if(masscmds.has(msg.author.id)) {
            cooldown = c.massCooldown
            return msg.channel.createMessage("Please wait before running another `mass` command")
          } else {
            masscmds.add(msg.author.id);
            setTimeout(() => masscmds.delete(msg.author.id), c.massCooldown);
          }
        } else { // Otherwise use the default cooldown of 3 second
          if(othercmds.has(msg.author.id)) {
            return msg.channel.createMessage("Please wait before running another command")
          } else {
            othercmds.add(msg.author.id);
            setTimeout(() => othercmds.delete(msg.author.id), c.cooldown);
          }
        }

        // Run the command
        await commands[i].execute(bot, msg, args, commands, logger);
        break;
      }
    }
  }
});


bot.connect(); // Connect to Discord

// Catch uncaught errors
process.on("unhandledRejection", e => logger.uncaughtError(e) )
process.on("uncaughtException", e => logger.uncaughtError(e) )