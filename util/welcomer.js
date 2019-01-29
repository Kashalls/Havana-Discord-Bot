const { Canvas } = require("canvas-constructor");
const { registerFont, createCanvas } = require("canvas");
const fsn = require("fs-nextra");
const imageDownload = require("image-download");
registerFont("./fonts/Aldo.ttf", {family: "welcomer"});

module.exports = {
    generate:async function(bot, guild, member, channelID) {
        let pfp = member.avatarURL;
        if(!member.avatarURL) {
            pfp = "https://vignette.wikia.nocookie.net/theamazingworldofgumball/images/a/af/Discord_Logo.png/revision/latest?cb=20170105233205";
        }
        let toBuffer = pfp;
        let welcome = await fsn.readFile("./img/welcome.png");
        imageDownload(toBuffer).then(incomingBuffer => {
            let img = new Canvas(325, 122)
            .addImage(welcome, 0, 0, 325, 122)
            .addImage(incomingBuffer, 14, 18, 101, 101)
            .setTextFont("20px welcomer")
            .setColor("#FFFFFF")
            .addText(`${member.username}#${member.discriminator}`, 123, 105)
            .toBuffer();
            bot.createMessage(channelID, "", {file: img, name: "render.jpg"});
        })
    }
}