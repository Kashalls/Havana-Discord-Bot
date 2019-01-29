module.exports = {
  command: "help",
  description: "Get Help",
  syntax: ")>help `|` )>help [command name]",
  category: "Utility",
  permission: "sendMessages",
  botPermission: "embedLinks",
  execute: async (bot, msg, args, commands, logger, c, s) => {
      let prefix = c.prefix
      let moderation = [];
      let developer = [];
      let fun = [];
      let utility = [];
      let img = [];
      for (i = 0; i < commands.length; i++) {
          if (commands[i].category === "Moderation") {
              moderation.push(commands[i].command);
          }
          if (commands[i].category === "Developer") {
              developer.push(commands[i].command);
          }
          if (commands[i].category === "Fun") {
              fun.push(commands[i].command);
          }
          if (commands[i].category === "Utility") {
              utility.push(commands[i].command);
          }
          if (commands[i].category === "Image Manipulation") {
              img.push(commands[i].command);
          }
      }
      if (!args[0] || args[0] === undefined) {
          await msg.channel.createMessage({
              embed: {
                  color: 0x36393E,
                  fields: [{
                          name: "» Moderation 🔨",
                          value: `\`${moderation.join("`, `")}\``
                      },
                      {
                          name: "» Utility 🔧",
                          value: `\`${utility.join("`, `")}\``
                      },
                      {
                          name: "» Fun 🎲",
                          value: `\`${fun.join("`, `")}\``
                      },
                      {
                          name: "» Image Manipulation 📸",
                          value: `\`${img.join("`, `")}\``
                      },
                      {
                          name: "» Developer 🔒",
                          value: `\`${developer.join("`, `")}\``
                      },
                      {
                          name: "» Our Discord Server 🏰",
                          value: "https://discord.gg/C9reUPF"
                      },
                      {
                          name: "» Download This Bot 🔗",
                          value: "https://github.com/TannerReynolds/Havana-Discord-Bot"
                      },
                  ],
                  author: {
                      icon_url: msg.author.avatarURL,
                      name: `${msg.author.username}#${msg.author.discriminator}`
                  },
                  footer: {
                      text: `${commands.length} commands loaded // "${prefix}help [cmd name]" for info on a specific cmd`
                  }
              }
          })

      }
      if (args[0] !== undefined) {
          let commandName = args[0];
          let syntax = null;
          let description = null;
          let category = null;
          let permission = null;
          let botPerm = null;
          for (i = 0; i < commands.length; i++) {
              if (commands[i].command.toLowerCase() === args[0]) {
                  syntax = commands[i].syntax;
                  description = commands[i].description;
                  category = commands[i].category;
                  permission = commands[i].permission;
                  botPerm = commands[i].botPermission;
              }
          }
          await msg.channel.createMessage({
              embed: {
                  color: 0x36393E,
                  title: "Help: " + commandName.toUpperCase(),
                  fields: [{
                          name: "Description",
                          value: description
                      },
                      {
                          name: "Syntax",
                          value: syntax.replace(/\)>/g, prefix)
                      },
                      {
                          name: "Category",
                          value: category
                      },
                      {
                          name: "Permissions Required",
                          value: permission
                      },
                      {
                          name: "Bot Permissions Required",
                          value: botPerm
                      },
                  ],
                  author: {
                      icon_url: msg.author.avatarURL,
                      name: `${msg.author.username}#${msg.author.discriminator}`
                  }
              }
          })
      }
  }
}