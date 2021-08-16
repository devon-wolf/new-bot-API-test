import { Client, Collection, CommandInteraction } from 'discord.js';

export interface CommandObject {
    default: {
        name: string;
        description: string;
        options: unknown[];
        execute: (interaction: CommandInteraction) => Promise<void>;
    }
}

export type CommandClient = Client & {
    commands: Collection<string, CommandObject>
}
