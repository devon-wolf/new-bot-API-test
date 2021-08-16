import { CommandInteraction } from 'discord.js';
import { makeCommand } from '../utils/commandHandler';

export default makeCommand({
    name: 'ping',
    description: 'replies with pong',
    callback: (async (interaction: CommandInteraction) => await interaction.reply('pong'))
});
