const { MessageEmbed } = require('discord.js');

const helpEmbed = new MessageEmbed()
    .setTitle('Help commands')
    .setColor('#0099ff')
    .addFields({ name: 'j!<name_of_person>', value: 'Shows photo of person' }, { name: 'j!help', value: 'Shows list of commands' });

module.exports = helpEmbed;