const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const discord = require('discord.js')

const fs = require('fs')

client.commands = new discord.Collection();
client.aliases = new discord.Collection();


client.categories = fs.readdirSync('./commands/');


['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});




   
client.on("ready", () => {
  console.log("logged");
});



client.login(proccess.env.token);