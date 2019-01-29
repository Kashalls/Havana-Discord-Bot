[![](https://discordapp.com/api/guilds/299075280503308288/embed.png)](https://discord.gg/3bWf3a2)

<p align="center">
  <img src="https://qoilo.com/bKjgsk.gif">
</p>

# Havana Discord Bot
## Installation
Before you download this bot, you must first install [nodejs version 9+](https://nodejs.org/en/download/current/)

Once nodejs is installed, then download this bot by pressing this button

![Download Button](https://i.imgur.com/gTo8kUL.png)

You can verify that nodejs is installed by going into your command prompt, and typing `node -v` like so. It should give you a version number. Ensure this version number starts with a 9 or higher.

![Verify Node Installation](https://i.imgur.com/JYwGxYx.png)

Then extract the zipped bot files into a folder somewhere. After this is done, the bot has been installed, and you're ready to configure

![Folder Displaying Bot Files](https://i.imgur.com/fTE6WuA.png)

## Configuration

### Making a bot account
To get started with the bot, you must first create a bot account through Discord. To do this, you're going to head [here](https://discordapp.com/developers/applications/me) and click on `New App`

Once you"ve made the application, you"ll need to make a bot account for it. To do this, just click on `Create a Bot User`

![Create Bot Account](https://i.imgur.com/rsVbxSc.png)

Under the `Bot` section, you"ll be able to decide whether or not you want your bot to be public or not, but what we need from this section at the moment is the token. Click `Reveal token` and copy the token it displays

![Bot Token](https://i.imgur.com/wSScIC5.png)

Now that we have the token, we can start with our configuration file

### config.json

Open up the file `config.json`, you"ll see something like this
```json
{
    "token":"Bot Token Goes Here",
    "shardCount": number of shards here without quotes,
    "devs":["Owner ID goes here"],
    "havana": "Havana API server URL (use api.qoilo.com if not selfhosting image API)",
    "steamToken": "Steam API Key",
    "guildStatChannel": "Channel ID for the channel you want to log guild joins/leaves to",
    "prefix": ")>",
    "playing": "Type what game you want the bot to be playing on startup",
    "cooldown": cooldown in milliseconds goes here without quotes,
    "massCooldown": mass commands cooldown in milliseconds goes here without quotes,
    "adblock": {
        "enabled": true or false without quotes
    },
    "roleme": {
        "enabled": true or false without quotes,
        "roleNames": ["role name 1", "role name 2"] <-- These are case-sensitive,
    },
    "autoNick": {
        "enabled": true or false without quotes,
        "nickname": "nickname to be auto-applied"
    },
    "autoRole": {
        "enabled": true or false without quotes,
        "roleName": "Role name (case-sensitive)"
    },
    "linkBlocking": {
        "enabled": true or false without quotes,
        "channels": ["channel ID 1", "channel ID 2"]
    },
    "pollChannel": {
        "enabled": true or false without quotes,
        "channel": "channel ID here"
    },
    "modLogs": {
        "enabled": true or false without quotes,
        "channel": "channel ID here"
    },
    "welcomer": {
        "enabled": true or false without quotes,
        "channel": "channel ID"
    }  
}
```
##### Token
 * Paste your token in the `token` section, and ensure it"s wrapped in quotes
 * Do not give your token to any user, even if they say they need it. This will give them full access to the bot account.
 * You can regenerate your token if it gets leaked, via the bot page where you created your bot
##### Prefix
 * Paste the prefix you want the bot to use, wrapped in quotes
##### Havana
 * This is the domain that will be used to talk to the image processor API.
 * If you're not hosting your own Havana image processor, then just use the default url: api.qoilo.com
 * api.qoilo.com is my instance of Havana Image Processor
##### Steam Token
 * This is the API key for Steam used for the bot"s SteamID command
 * You can get an API key [here](https://steamcommunity.com/login/home/?goto=%2Fdev%2Fapikey)
##### Guild Stat Channel
 * This asks for a channel ID. The channel you input will be used to log guild joins and leaves
##### Devs
 * If you are the only bot owner, then just paste your user ID in like this `["205912295837138944"]`
 * If there is more than one owner, then put a comma after your ID, and put their"s, like so `["205912295837138944", "403854965191344139"]`
 * If you do not know how to get your Discord user ID, [this](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) will help you out
##### Playing Status
 * This is what your bot will display it"s playing, wrap this in quotes as well, just like all the ones before
##### Cooldown
 * This is the cooldown that the bot will use before a user can run another command.
 * This is in milliseconds
##### Mass Cooldown
 * Separate from other commands, commands that are prefixed with `mass` get a different cooldown
 * This is because of how long it takes for each mass command to execute.
 * Execution length is dependent on how large a guild is
##### Ad-Block
 * Type in `true` without quotes, to enable this
 * This will delete invite links to discord servers that are sent in your guild. 
 * Adblock ignores invites sent by moderators and admins
##### Roleme
 * Type in `true` without quotes, to enable this
 * Role Names
   * Role names are typed out in an array and are case-sensitive
   * Example: ["Blue", "Green", "Newbie", "flower"]
##### Auto-Nick
 * Type in `true` without quotes, to enable this
 * Sets a default nickname to give all that join your guild
##### Auto-Role
 * Type in `true` without quotes, to enable this
 * Sets a role to be given automatically on join
##### Link Blocking
 * Type in `true` without quotes, to enable this
 * Channels
   * Channels are IDs given in an array
   * Each channel in the array will have all clickable links blocked
##### Poll Channel
 * Type in `true` without quotes, to enable this
 * Channel inputted will have all it"s messages have a ✅ and a ❌ added to the message as reactions for users to vote on
##### Mod-Logs (In-progress)
 * Type in `true` without quotes, to enable this
 * Channel inputted will be the channel used for logging things like message edits and deletes
##### Welcomer (In-progress)
 * Type in `true` without quotes, to enable this
 * Channel inputted will have welcome images sent when users join
 * Currently does not work

### Starting Up The Bot

Now that the bot is all nice and configured, it"s time to boot it up. To do this, go in the folder that has all the bot files, *hold shift, then right click while holding shift*. You should see an option that says `open command window here` or `open powershell window here`. Click that option

![Context Menu Example](https://i.imgur.com/7r6cgxb.png)

Once the window is open, run the command `npm install`. This command will install all of the bot"s required modules

![npm install](https://i.imgur.com/TD0ZxGN.png)

If you see a few warnings that look like those ones, you're fine, continue to the next step, which is running the bot

To start the bot, just run `node app.js` like so

![running app](https://i.imgur.com/HhY8BLm.png)

Congratulations, you now have a custom instance of the bot!

If you find a bug, issue, or have any concerns or suggestions, we"d be glad to hear them on [our Discord server](https://discord.gg/C9reUPF)

### Inviting The Bot

Once your bot is up and running, it"s time to invite your bot. You can do so by going to [this website](https://discordapi.com/permissions.html) and generating an invite for your bot. You can find your bot"s client ID on the page where you created the bot.

Once invited, your bot will have a command called `invite`, which other people can use to invite your bot, without having to generate their own invites.


### Optional

If you do not wish to have the command window open while you run the bot, you can run the bot in the background with an npm module called `pm2`

To install pm2, simply run the command `npm install -g pm2`

Then, in your command prompt when the bot is not running, type `pm2 start app.js`

![pm2 launch](https://i.imgur.com/225InsR.png)

You can monitor the bot by running the command `pm2 monit` to display logs and resource usage

![pm2 monit](https://i.imgur.com/ZgPggka.png)
