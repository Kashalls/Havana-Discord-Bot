const gm = require('gm')
const imageDownload = require('image-download');
const argHandler = require('../../util/imgHandler.js')
module.exports = {
    command:"flip",
    description: "Flip an image horizontally",
    syntax: ")>flip `|` )>flip [Attachment | User Name | User ID | User Mention | Image URL | Emoji ]",
    category: "Image Manipulation",
    permission: "sendMessages",
    botPermission: "attachFiles",
    execute:async function(bot, msg, args){
        argHandler.handle(bot, msg, args, renderImage);
        async function renderImage(img) {
            let toBuffer = img;
            imageDownload(toBuffer).then(incomingBuffer => {
                gm(incomingBuffer).flop().toBuffer('PNG', (err, buffer) => {
                    return msg.channel.createMessage('', {file: buffer, name: 'render.jpg'});
                }); 
            })
        }
    }
}