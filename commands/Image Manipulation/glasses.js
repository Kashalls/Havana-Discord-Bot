const faceapp = require("faceapp"),
superagent = require("superagent");
const argHandler = require("../../util/imgHandler.js")
module.exports = {
command: "glasses",
description: "Give somebody glasses",
syntax: ")>glasses `|` )>glasses [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
category: "Image Manipulation",
permission: "sendMessages",
botPermission: "attachFiles",
execute:async (bot, msg, args, commands, logger, c, s) => {
    argHandler.handle(bot, msg, args, renderImage);
    async function renderImage(img) {
        let res = await superagent.get(img)
        await faceapp.process(res.body, "glasses").then(facePic => {
            msg.channel.createMessage("", {
                file: facePic,
                name: "face.png"
            });
        }).catch(e => msg.channel.createMessage("Couldn' detect any faces"));
    }
  }
}