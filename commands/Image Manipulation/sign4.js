

const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command:"sign4",
    description: "the 4th sign command in the series of sign commands",
    syntax: ")>sign4 `|` )>sign4 [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            s.get(`http://${c.havana}/canvas?url=${img}&effect=sign4`).then(r => msg.channel.createMessage("", {file: r.body, name: "render.jpg"}))
        }
    }
}