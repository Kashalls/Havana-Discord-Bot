

const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command:"view",
    description: "I had to grind for this view",
    syntax: ")>view `|` )>view [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            s.get(`http://${c.havana}/canvas?url=${img}&effect=view`).then(r => msg.channel.createMessage("", {file: r.body, name: "render.jpg"}))
        }
    }
}