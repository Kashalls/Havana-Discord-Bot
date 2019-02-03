
module.exports = {
    command: "meme",
    description: "sends a good meme",
    syntax: ")>meme [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        s.get("https://www.reddit.com/r/dankmemes/top.json?limit=100&t=day").then(r => {
            let imageMemes = [];
            for (i = 0; i < r.body.data.children.length; i++) {
                if (r.body.data.children[i].data.url) imageMemes.push(r.body.data.children[i].data.url)
            }
            msg.channel.createMessage({
                embed: {
                    color: 0x36393E,
                    author: {
                        name: "meme",
                        icon_url: msg.author.avatarURL
                    },
                    image: {
                        url: imageMemes[Math.floor(Math.random() * (imageMemes.length - 1))]
                    }
                }
            });
        }).catch(e => msg.channel.createMessage(e))
    }
}