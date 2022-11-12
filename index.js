const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32771 });
require('dotenv').config();

client.login(process.env.DISCORD_TOKEN)
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slash_commands = new Discord.Collection();
[ 'event_handler', 'interaction_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
})