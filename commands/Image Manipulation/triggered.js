const snekfetch = require('snekfetch')
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"triggered",
    description: "triggered",
    syntax: ")>triggered `|` )>triggered [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async function(bot, msg, args){
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            snekfetch.get(`http://triggered-api.tk/api/v1/url=${img}`)
            .then(r => {
                return msg.channel.createMessage('', {
                    file: r.body,
                    name: `triggered.gif`
                });
            });
        }
    }
}