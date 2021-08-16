import { CommandInteraction, Collection } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type CommandCallback = (interaction: CommandInteraction) => Promise<void>

export interface CommandObject {
    data: SlashCommandBuilder;
    execute: CommandCallback;
}

export interface CommandExport {
    default: CommandObject;
}

export type CommandCollection = Collection<string, CommandExport>

export interface CommandProps {
    name: string;
    description: string;
    callback: CommandCallback
}
