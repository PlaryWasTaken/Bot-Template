const discord = require('discord.js');
module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDefaultMemberPermissions(8),
    async execute({interaction, client}) {
        await interaction.reply('Pong!');
    }
}