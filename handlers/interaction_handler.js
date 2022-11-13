const fs = require('fs');

module.exports = (client) => { // Loads all slash commands and puts them in a collection - pt-br: Carrega todos os slash commands e os coloca em uma collection
    const command_folders = fs.readdirSync('./slash_commands/');
    for (const folder of command_folders) {
        const files = fs.readdirSync(`./slash_commands/${folder}`).filter(file => file.endsWith('.js'))
        console.log(`[Loading Phase] Loading folder ${folder}...`)
        for (const file of files) {
            const command = require(`../slash_commands/${folder}/${file}`);
            console.log(`[Loading Phase] Loading Command File ${file}...`)
            if (command.data.name) {
                client.slash_commands.set(command.data.name, command);
            }
        }
    }
    console.log(`[Loading Phase] Finished loading slash commands`)
    
}