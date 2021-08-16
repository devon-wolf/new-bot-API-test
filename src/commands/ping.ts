import { CommandInteraction } from 'discord.js';
import makeCommand from '../utils/makeCommand';

export default makeCommand(
    'ping',
    'replies with pong',
    (async (interaction: CommandInteraction) => await interaction.reply('pong'))
);

