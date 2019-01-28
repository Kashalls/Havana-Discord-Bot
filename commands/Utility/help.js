const snekfetch = require('snekfetch');
const c = require("../../config.json")
module.exports = {
  command:"help",
  description: "Get Help",
  syntax: ")>help `|` )>help [command name]",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute:async function(bot, msg, args, commands, conn){
    let prefix = c.prefix
    let moderation = [];
    let developer = [];
    let fun = [];
    let utility = [];
    let img = [];
    let nsfw = [];
    for(i = 0; i < commands.length; i++) {
      if(commands[i].category === "Moderation") {
        moderation.push(commands[i].command);
      }
      if(commands[i].category === "Developer") {
        developer.push(commands[i].command);
      }
      if(commands[i].category === "Fun") {
        fun.push(commands[i].command);
      }
      if(commands[i].category === "Utility") {
        utility.push(commands[i].command);
      }
      if(commands[i].category === "Image Manipulation") {
        img.push(commands[i].command);
      }
      if(commands[i].category === "NSFW") {
        nsfw.push(commands[i].command);
      }
    }
    if (!args[0] || args[0] === undefined) {
      await msg.channel.createMessage({ embed: { 
        color: 0x36393E, 
        fields: [
          {name: "» Moderation 🔨", value: `\`${moderation.join("`, `")}\``},
          {name: "» Utility 🔧", value: `\`${utility.join("`, `")}\``},
          {name: "» Fun 🎲", value: `\`${fun.join("`, `")}\``},
          {name: "» Image Manipulation 📸", value: `\`${img.join("`, `")}\``},
          {name: "» NSFW 🚫", value: `\`${msg.channel.nsfw ? nsfw.join("`, `") : "`You cannot see nsfw commands unless you're in an nsfw channel!`"}\``},
          {name: "» Developer 🔒", value: `\`${developer.join("`, `")}\``},
          {name: "» Our Discord Server 🏰", value: "https://discord.gg/5avnG8a"},
          {name: "» Our Website 🔗", value: "https://qoilo.com"},
        ],
        author: {
          icon_url: msg.author.avatarURL,
          name: `${msg.author.username}#${msg.author.discriminator}`
        },
        footer: {
          text: `${commands.length} commands loaded // "${prefix[0]}help [cmd name]" for info on a specific cmd`
        }
      }})
      
    }
    if(args[0] !== undefined) {
      if(args[0].toLowerCase() === "markdown") {
        let data = `## Moderation\n#### \`${moderation.join("`, `")}\`\n\n## Utility\n#### \`${utility.join("`, `")}\`\n\n## Fun\n#### \`${fun.join("`, `")}\`\n\n## Image Manipulation\n#### \`${img.join("`, `")}\`\n\n## Developer\n#### \`${developer.join("`, `")}\`\n\n`
        snekfetch.post('http://thiccbit.ch/api/havanabin')
        .send({text: data})
        .then(r => {
            msg.channel.createMessage(`help.md uploaded! Here is the link: ${r.body.pasted}`)
        }).catch(e => {
            msg.channel.createMessage(e.text);
        });
      }
      let commandName = args[0];
      let syntax = null;
      let description = null;
      let category = null;
      let permission = null;
      let botPerm = null;
      for(i = 0; i < commands.length; i++) {
        if(commands[i].command.toLowerCase() === args[0]) {
          syntax = commands[i].syntax;
          description = commands[i].description;
          category = commands[i].category;
          permission = commands[i].permission;
          botPerm = commands[i].botPermission;
        }
      }
      await msg.channel.createMessage({ embed: { 
        color: 0x36393E,
        title: "Help: "+ commandName.toUpperCase(), 
        fields: [
          {name: "Description", value: description},
          {name: "Syntax", value: syntax.replace(/\)>/g, prefix[0])},
          {name: "Category", value: category},
          {name: "Permissions Required", value: permission},
          {name: "Bot Permissions Required", value: botPerm},
        ],
        author: {
          icon_url: msg.author.avatarURL,
          name: `${msg.author.username}#${msg.author.discriminator}`
        } 
      }})
    }
  }
}