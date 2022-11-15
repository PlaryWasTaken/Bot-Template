const discord = require('discord.js');
module.exports = {
    // Comando para demonstrar outras opcões com que se pode criar slash commands
    data: new discord.SlashCommandBuilder()
        .setName('test')
        .setDescription('Um comando de teste explicativo sobre slash commands')
        .setDefaultMemberPermissions(8) // Permissões padrão necessário para observar o comando em bigInt - en-us: Default permissions needed to see the command in bigInt
        .setNameLocalizations({
            'en-US': 'test',
            'pt-BR': 'teste'
        }) // Localizações do nome do comando — en-us: Command name localizations
        .addStringOption(option => option.setName('string').setDescription('String option').setRequired(true))
        /*
           Adicionando uma opção do tipo string onde o user pode escolher entre opcões pre-definidas ou escrever o que quiser
           É possivel adicionar opcões do tipo: string, integer, boolean, user, channel, role, mentionable, number
           Em todos os tipos de opções, é possivel tornar a opção obrigatória ou não */
        /*
           en-us: Adding a string type option where the user can choose between predefined options or write whatever they want
              It is possible to add options of type: string, integer, boolean, user, channel, role, mentionable, number
              In all types of options, it is possible to make the option required or not
         */

    ,
    async execute({interaction, client}) {
        // Para pegar uma opcão do tipo string se utiliza o metodo getString() passando o nome da opcão como parametro
        // en-us: To get a string type option you use the getString() method passing the option name as a parameter
        const string = interaction.options.getString('string');
        await interaction.reply(`Você digitou: ${string}`);
    }
}