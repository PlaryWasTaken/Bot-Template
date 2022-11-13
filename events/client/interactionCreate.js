const discord = require('discord.js');

module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.slash_commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute({ client, interaction});
        } catch (error) {
            console.error(error);
            if (interaction.replied) await interaction.followUp({ content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true });
            else await interaction.reply({content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true});
        }
        return
    }
}