const faceapp = require("faceapp"),
superagent = require("superagent");
const argHandler = require("../../util/imgHandler.js")
module.exports = {
command: "female",
description: "Make somebody look female",
syntax: ")>female `|` )>female [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
category: "Image Manipulation",
permission: "sendMessages",
botPermission: "attachFiles",
execute:async (bot, msg, args, commands, logger, c, s) => {
    argHandler.handle(bot, msg, args, renderImage);
    async function renderImage(img) {
        let res = await superagent.get(img)
        await faceapp.process(res.body, "female_2").then(facePic => {
            msg.channel.createMessage("", {
                file: facePic,
                name: "face.png"
            });
        }).catch(e => msg.channel.createMessage("Couldn' detect any faces"));
    }
  }
}