import { CommandInteraction } from 'discord.js';
import { makeCommand } from '../utils/commandHandler';

export default makeCommand({
    name: 'timer',
    description: 'sets a timer',
    callback: (async (interaction: CommandInteraction) => {
        await interaction.reply('Timer set.');
        setTimeout(async () => {
            await interaction.channel?.send('BRRRRIIIIING! Timer\'s up.');
        }, 3000);
    })
});
