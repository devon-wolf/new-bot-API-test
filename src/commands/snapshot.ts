import { CommandInteraction } from 'discord.js';
import { makeCommand } from '../utils/commandHandler';

export default makeCommand({
    name: 'snapshot',
    description: 'replies with a snapshot of user data',
    callback: (async (interaction: CommandInteraction): Promise<void> => {
        await interaction.reply('placeholder snapshot');
    })
});
