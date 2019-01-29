const faceapp = require("faceapp"),
      superagent = require("superagent");
      const argHandler = require("../../util/imgHandler.js")
module.exports = {
  command:"old",
  description: "Make somebody look old",
  syntax: ")>old `|` )>old [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
  category: "Image Manipulation",
  permission: "sendMessages",
  botPermission: "attachFiles",
  execute:async (bot, msg, args, commands, logger, c, s) => {
    argHandler.handle(bot, msg, args, renderImage);
    async function renderImage(img) {
      let res = await superagent.get(img)
      await faceapp.process(res.body, "old").then(oldPic => {
        return msg.channel.createMessage("", {file: oldPic, name: "old.png"});
      }).catch(e => msg.channel.createMessage("Couldn' detect any faces"));
    }
  }
}