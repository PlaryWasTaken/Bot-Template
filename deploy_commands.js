const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

if (!process.env.DISCORD_TOKEN) throw new Error('No DISCORD_TOKEN found in .env file');
if (!process.env.CLIENT_ID) throw new Error('No CLIENT_ID found in .env file');
if (!process.env.GUILD_ID) throw new Error('No GUILD_ID found in .env file');


const commands = [];
const foldersPath = path.join(__dirname, 'slash_commands');
const commandFolders = fs.readdirSync(foldersPath)
const globalCommands = [];
for (folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        console.log(folder === 'Global' ? command.data.toJSON() : undefined)
        if (folder === 'Global') globalCommands.push(command.data.toJSON())
        else commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered guild commands.'))
    .catch(console.error);
rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: globalCommands },
).then( () => console.log('Successfully registered global commands'))