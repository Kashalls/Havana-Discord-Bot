const s = require("snekfetch")
const c = require("../../config.json")
const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command:"shit",
    description: "I stepped in shit",
    syntax: ")>shit | )>shit [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async function(bot, msg, args){
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            s.get(`http://${c.havana}/canvas?url=${img}&effect=shit`).then(r => msg.channel.createMessage('', {file: r.body, name: 'render.jpg'}))
        }
    }
}