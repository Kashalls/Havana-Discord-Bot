;
const argHandler = require("../../util/imgHandler.js")
module.exports = {
    command: "magik",
    description: "Magik-ify an image",
    syntax: ")>magik | )>magik [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        argHandler.handle(bot, msg, args, renderImage);
        function renderImage(img) {
            msg.channel.createMessage("Loading...").then(m => {
            snekfetch.get(`https://discord.services/api/magik?url=${img}`)
                .then(r => {
                    m.delete();
                    return msg.channel.createMessage("", {
                        file: r.body,
                        name: `magik.png`
                    });
                });
            })
        }
    }
}