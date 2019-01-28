module.exports = {
    command: "mute",
    description: "Mute a user, stopping them from joining any channels or typing in any.",
    syntax: ")>mute [User Mention | User ID]",
    category: "Moderation",
    permission: "manageChannels",
    botPermission: "manageChannels",
    execute: async function(bot, msg, args) {
        if(!args[0]) return msg.channel.createMessage('You need to give somebody to mute');
        if(msg.mentions.length >= 1) {
            let target = msg.mentions[0].id;
            muteUser(target)
        } else if(msg.channel.guild.members.filter(m => m.id === args[0])[0]) {
            muteUser(args[0])
        } else {
            msg.channel.createMessage('No user found to mute')
        }
        async function muteUser(id) {
            let tc = msg.channel.guild.channels.filter(c => c.permissionsOf(bot.user.id).has('manageChannels') && c.permissionsOf(id).has('readMessages') && c.permissionsOf(id).has('sendMessages') && c.type === 0);
            if(!tc[0]) return;
            let interval = 300;
            let promise = Promise.resolve();
            msg.channel.createMessage(`Now muting <@${id}>`)
            tc.forEach(c => {
                promise = promise.then(() => {
                    c.editPermission(id, 1024, 2048, "member");
                    return new Promise(function (resolve) {
                        setTimeout(resolve, interval);
                    });
                });
            });
            promise.then(() => {
                msg.channel.createMessage(`Successfully Muted <@${id}>`)
            })
        }
    }
}