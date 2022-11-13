const fs = require('fs');

module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of event_files) {
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, client))
        }
    }

    ['client'].forEach(e => load_dir(e));
    // Load all events from the client folder if you want to load events from other folders, just add them to the array
    // pt-br: Carrega todos os eventos da pasta client, se você quiser carregar eventos de outras pastas, apenas adicione-os ao array
}