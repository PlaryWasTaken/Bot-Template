// Verify .env file is in the same directory as index.js and contains the token
// pt-br: Verifique se o arquivo .env está no mesmo diretório que o index.js e contém o token do bot
const fs = require('fs');
const file = fs.readFileSync('.env', 'utf8');
if (!file) throw new Error('No .env file found or .env file is empty');
if (!file.includes('DISCORD_TOKEN')) throw new Error('No DISCORD_TOKEN found in .env file');


// Starting the bot and loading events and slash commands
// Iniciando o bot e carregando eventos e slash commands
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32771 });
require('dotenv').config();

client.login(process.env.DISCORD_TOKEN).then(() => {
  console.log(`[Loading Phase] Logged in as ${client.user.tag}`);
})
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slash_commands = new Discord.Collection();
[ 'event_handler', 'interaction_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
})