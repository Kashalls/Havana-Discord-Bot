const faceapp = require('faceapp'),
superagent = require('superagent');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
command: "hipster",
description: "Give somebody a beard",
syntax: ")>hipster `|` )>hipster [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
category: "Image Manipulation",
permission: "sendMessages",
botPermission: "attachFiles",
execute: async function(bot, msg, args) {
    argHandler.handle(bot, msg, args, renderImage);
    async function renderImage(img) {
        let res = await superagent.get(img)
        await faceapp.process(res.body, 'hipster').then(facePic => {
            msg.channel.createMessage('', {
                file: facePic,
                name: 'face.png'
            });
        }).catch(e => msg.channel.createMessage('Couldn\'t detect any faces'));
    }
  }
}