module.exports = {
    command: "nearest16",
    description: "convert a decimal measurement to a fraction down to a 16th of an inch",
    syntax: ")>nearest16 [number]",
    category: "Utility",
    permission: "sendMessages",
    botPermission: "embedLinks",
    execute: async (bot, msg, args, commands, logger, c, s) => {
        args = parseFloat(args[0]);
        let converted = [{
                decimal: 0,
                fraction: "0"
            },
            {
                decimal: 0.0625,
                fraction: "1/16th"
            },
            {
                decimal: 0.125,
                fraction: "1/8"
            },
            {
                decimal: 0.1875,
                fraction: "3/16"
            },
            {
                decimal: 0.25,
                fraction: "1/4"
            },
            {
                decimal: 0.3125,
                fraction: "5/16"
            },
            {
                decimal: 0.375,
                fraction: "3/8"
            },
            {
                decimal: 0.4375,
                fraction: "7/16"
            },
            {
                decimal: 0.5,
                fraction: "1/2"
            },
            {
                decimal: 0.5625,
                faction: "9/16"
            },
            {
                decimal: 0.625,
                fraction: "5/8"
            },
            {
                decimal: 0.6875,
                fraction: "11/16"
            },
            {
                decimal: 0.75,
                fraction: "3/4"
            },
            {
                decimal: 0.8125,
                fraction: "13/16"
            },
            {
                decimal: 0.875,
                fraction: "7/8"
            },
            {
                decimal: 0.9375,
                fraction: "15/16"
            },
            {
                decimal: 1,
                fraction: "1"
            }
        ];
        let answers = [];
        let measureInt = Math.floor(args);
        let decimal = args - measureInt;
        let smallest = 0

        for (i = 0; i < converted.length; i++) {
            let answer = decimal - converted[i].decimal;
            if (answer < 0) answer = answer * -1;
            answers.push({
                decimal: answer,
                fraction: converted[i].fraction
            });
        }
        let init = answers[0].decimal
        smallest = answers.reduce((prev, cur) => {
            smallestNum = prev.decimal < cur.decimal ? {
                decimal: prev.decimal,
                fraction: prev.fraction
            } : {
                decimal: cur.decimal,
                fraction: cur.fraction
            };
            return smallestNum
        }, init)
        if (smallest.fraction === "1") {
            smallest = `${measureInt + parseInt(smallest.fraction)}"`
        } else if (smallest.fraction === "0") {
            smallest = `${measureInt}"`
        } else {
            smallest = `${measureInt} ${smallest.fraction}"`
        }

        msg.channel.createMessage({
            embed: {
                color: 0x36393E,
                author: {
                    icon_url: msg.author.avatarURL,
                    name: smallest
                }
            }
        })

    }
}