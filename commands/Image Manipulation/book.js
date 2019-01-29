

const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command:"book",
    description: "A series of unfortunate events",
    syntax: ")>book `|` )>book [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            s.get(`http://${c.havana}/canvas?url=${img}&effect=book`).then(r => msg.channel.createMessage("", {file: r.body, name: "render.jpg"}))
        }
    }
}