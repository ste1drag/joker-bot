const fs = require('fs');
const { Client, Collection, Intents, } = require('discord.js');
const { token, guildId } = require('./config.json');
const help = require('./embeds/helpEmbed.js');


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {

    client.user.setUsername('JOKER BOT');

});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand())
        return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
        return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
    }

});

const prefix = "j!";
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix)) {
        return;
    }
    if (message.content === 'j!krile') {
        message.channel.send({ files: ['./krile.jpeg'] });
    }

    if (message.content === 'j!boza') {
        message.channel.send({ files: ['./boza.jpeg'] });
    }
    if (message.content === 'j!gavra') {
        message.channel.send({ files: ['./gavra.jpeg'] });
    }
    if (message.content === 'j!help') {
        message.channel.send({ embeds: [help] })
    }

});


client.login(token);