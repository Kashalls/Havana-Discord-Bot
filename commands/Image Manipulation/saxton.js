

const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command:"saxton",
    description: "Saxton approves of this",
    syntax: ")>saxton `|` )>saxton [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            s.get(`http://${c.havana}/canvas?url=${img}&effect=saxton`).then(r => msg.channel.createMessage("", {file: r.body, name: "render.jpg"}))
        }
    }
}