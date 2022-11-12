const discord = require('discord.js');
const embedSchema = require('../../models/embedSchema');
module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName('enviar')
        .setDescription('Envia uma embed ou um conjunto de embeds')
        .setDefaultMemberPermissions(8)
        .addStringOption(option =>
            option
            .setName('embed')
            .setDescription('O embed que você deseja enviar')
            .setRequired(true)
            .setAutocomplete(true)
        ),
    async execute({interaction, client}) {
        const embed = interaction.options.getString('embed')
        const data = await embedSchema.findOne({ embedName: embed })
        if (!data) return interaction.reply({ephemeral: true, content: `Não achei esse embed`})
        const embedData = new discord.EmbedBuilder(JSON.parse(data.embedJson))

        await interaction.reply({ephemeral: true, content: `Embed enviado com sucesso`})
    },
    async autocomplete({interaction, client}) {
        const embeds = await embedSchema.find({id: new RegExp(interaction.options.getString('embed'), 'i')}).limit(25)
        const options = []
        embeds.forEach(server => {
            options.push({
                name: embeds.id,
                value: embeds.id
            })
        })
        await interaction.respond(options)
    }
}