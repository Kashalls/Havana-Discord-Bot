const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command: "pfp",
    description: "change bot's pfp",
    syntax: ")>pfp [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            s.get(img).then(r => {
                let pfp = `data:${r.headers['content-type']};base64,${r.body.toString('base64')}`
                bot.editSelf({avatar: pfp}).then(b => msg.channel.createMessage("Changed Profile Photo!")).catch(e => logger.error(e))
            })
        }
    }
}