import { CommandInteraction } from 'discord.js';
import makeCommand from '../utils/makeCommand';

export default makeCommand(
    'snapshot',
    'replies with a snapshot of user data',
    (async (interaction: CommandInteraction): Promise<void> => {
        await interaction.reply('placeholder snapshot');
    })
);
