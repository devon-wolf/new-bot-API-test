import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const ping = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),

    async execute(interaction: CommandInteraction): Promise<void> {
        await interaction.reply('pong');
    }
};

export default ping;
