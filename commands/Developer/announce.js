module.exports = {
    command: "announce",
    description: "Announce something to all servers the bot is in, mentioning everybody if possible",
    syntax: ")>announce [text]",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        if (msg.author.id !== "205912295837138944") return
        msg.channel.createMessage(`Sending the announcement to ${bot.guilds.size} guilds ... This process will take a while ...`);
        let blacklisted = ["110373943822540800", "330777295952543744", "112319935652298752", "293379346188599296", "338678403521576960", "264445053596991498"];
        let interval = 750;
        let promise = Promise.resolve();
        bot.guilds.forEach(function(g) {
            promise = promise.then(function() {
                if (!g || !g.name) return logger.error("guild doesnt exist");
                if (blacklisted.includes(g.id)) return logger.verbose(`Skipped Guild | ${g.name} | ${g.id}`);
                const gC = g.channels.filter(c => c.permissionsOf(bot.user.id).has("sendMessages") && c.type === 0)[0]
                if (!gC) {
                    logger.verbose("skipped guild due to no permission to send messages")
                } else {
                    let everyone = gC.permissionsOf(bot.user.id).has("mentionEveryone")
                    if (!everyone) {
                        gC.createMessage(args.join(" ")).catch(err => logger.error("Had trouble sending an announcement"));
                        logger.success(`announcement sent to [${g.name}]`)
                    } else {
                        gC.createMessage(`@everyone ${args.join(" ")}`).catch(err => logger.error("Had trouble sending an announcement"));
                        logger.success(`EVERYONE | announcement sent to [${g.name}]`)
                    }
                    return new Promise(function(resolve) {
                        setTimeout(resolve, interval);
                    });
                }
            });
        });
        promise.then(function() {
            logger.success("Finished Announcing!");
        });
    }
}