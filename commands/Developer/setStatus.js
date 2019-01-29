module.exports = {
    command: "setstatus",
    description: "Set the bot status",
    syntax: ")>setstatus [text]",
    category: "Developer",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute:async (bot, msg, args, commands, logger, c, s) => {
        bot.editStatus("online", {name: args.join(" "), type: 2, url: "https://havanabot.com"});
        msg.channel.createMessage("Successfully set status!");
    }
}