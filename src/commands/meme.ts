import { CommandInteraction } from 'discord.js';
import { makeCommand } from '../utils/commandHandler';

export default makeCommand({
    name: 'meme',
    description: 'sends a meme',
    callback: (async (interaction: CommandInteraction) => {
        await interaction.reply('send a meme when you\'re not so lazy');
    })
});
