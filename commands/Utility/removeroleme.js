module.exports = {
    command: "removeroleme",
    description: "remove a roleme",
    syntax: ")>removeroleme [role name] `|` )>removeroleme --list",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "manageRoles",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        if (!args[0] || args[0].toLowerCase() === "--list") {
            let rolemes;
            await conn.table("roleme").get(msg.channel.guild.id).run().then(entry => {
                    if (!entry) return msg.channel.createMessage("No roles available")
                    rolemes = entry.roles;
                })
                .error(e => {
                    msg.channel.createMessage(`An error occurred\n${e}`)
                })
            if (rolemes !== undefined) {
                let rolenames = [];
                msg.channel.guild.roles.map(r => {
                    if (rolemes.includes(r.id)) rolenames.push(r.name);
                })
                return msg.channel.createMessage({
                    embed: {
                        color: 0x36393E,
                        fields: [{
                            name: "Available Roles",
                            value: `\`${rolenames.join("`, `")}\``
                        }, ],
                        author: {
                            icon_url: msg.author.avatarURL ? msg.author.avatarURL : msg.author.defaultAvatarURL,
                            name: `${msg.author.username}#${msg.author.discriminator}`
                        }
                    }
                })
            }
        } else {
            let rolemes;
            let rolenames = [];
            await conn.table("roleme").get(msg.channel.guild.id).run().then(entry => {
                    if (!entry) return msg.channel.createMessage("No roles available")
                    rolemes = entry.roles;
                })
                .error(e => {
                    msg.channel.createMessage(`An error occurred\n${e}`)
                })
            msg.channel.guild.roles.map(r => {
                if (rolemes.includes(r.id)) rolenames.push(r.name);
            })
            if (!rolenames.includes(args.join(" "))) return msg.channel.createMessage("This role is not on the roleme list");
            let theRole = msg.channel.guild.roles.filter(r => r.name === args.join(" "))[0];
            msg.channel.guild.removeMemberRole(msg.author.id, theRole.id).then(m => {
                msg.channel.createMessage(`You have had the \`${theRole.name}\` role removed!`);
            }).catch(e => {
                return msg.channel.createMessage("Could not remove this role");
            })
        }
    }
}