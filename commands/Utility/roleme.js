module.exports = {
    command: "roleme",
    description: "get an available role from the list",
    syntax: ")>roleme [role name] `|` )>roleme --list",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "manageRoles",
    execute: async (bot, msg, args, commands) => {
        if (!args[0] || args[0].toLowerCase() === "--list") {
            let rolemes;
            if (c.roleme.enabled === true) {
                rolemes = c.roleme.roleNames
            } else {
                return msg.channel.createMessage("Roleme is not enabled!")
            }
            if (rolemes !== undefined) {
                let roleIDs = [];
                let rolenames = [];
                for (i = 0; i < msg.channel.guild.roles.length; i++) {
                    roleIDs.push(guild.roles.filter(r => r.name === c.roleme.roleNames[i])[0].id);
                }
                msg.channel.guild.roles.map(r => {
                    if (roleIDs.includes(r.id)) rolenames.push(r.mention);
                })
                return msg.channel.createMessage({
                    embed: {
                        color: 0x36393E,
                        fields: [{
                            name: "Available Roles",
                            value: `${rolenames.join(", ")}`
                        }, ],
                        author: {
                            icon_url: msg.author.avatarURL ? msg.author.avatarURL : msg.author.defaultAvatarURL,
                            name: `${msg.author.username}#${msg.author.discriminator}`
                        }
                    }
                })
            }
        } else {
            let roleIDs = [];
            let rolenames = [];
            if (c.roleme.enabled === false) {
                return msg.channel.createMessage("Roleme is not enabled!")
            } else {
                roleNames = c.roleme.roleNames;
            }
            for (i = 0; i < msg.channel.guild.roles.length; i++) {
                roleIDs.push(guild.roles.filter(r => r.name === c.roleme.roleNames[i])[0].id);
            }
            if (!rolenames.includes(args.join(" "))) return msg.channel.createMessage("This role is not on the roleme list");
            let theRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0];
            msg.channel.guild.addMemberRole(msg.author.id, theRole.id).then(m => {
                msg.channel.createMessage(`You have been given the \`${theRole.name}\` role!`);
            }).catch(e => {
                return msg.channel.createMessage("Could not give this role");
            })
        }
    }
}