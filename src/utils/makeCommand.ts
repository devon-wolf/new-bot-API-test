import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { CommandObject } from '../types';

const makeCommand = (name: string, description: string, callback: (interaction: CommandInteraction) => Promise <void>): CommandObject => {
    return {
        data: new SlashCommandBuilder()
            .setName(name)
            .setDescription(description),
        execute: callback
    };
};

export default makeCommand;
