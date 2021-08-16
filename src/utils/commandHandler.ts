import fs from 'fs';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection, CommandInteraction } from 'discord.js';
import { CommandObject, CommandProps, CommandCollection } from '../types';

export const makeCommand = ({ name, description, callback }: CommandProps): CommandObject => {
    return {
        data: new SlashCommandBuilder()
            .setName(name)
            .setDescription(description),
        execute: callback
    };
};

export const populateCommands = (): [CommandObject[], CommandCollection] => {
    const commands: CommandObject[] = [];

    const clientCommands: CommandCollection = new Collection();
    
    const commandFiles = fs
        .readdirSync(`${__dirname}/../commands`)
        .filter(file =>
            file.endsWith('.js') ||
                file.endsWith('.ts'));
    
    for (const file of commandFiles) {
        // TODO figure out right syntax for this
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(`${__dirname}/../commands/${file}`);

        commands.push(command.default.data.toJSON());
    
        clientCommands.set(command.default.data.name, command);
    }

    return [commands, clientCommands];
};

export const executeCommand = async (interaction: CommandInteraction, clientCommands: CommandCollection): Promise<void> => {
    const { commandName } = interaction;
    if (!clientCommands.has(commandName)) return;

    try {
        const command = clientCommands.get(commandName);

        if (command) {
            command.default.execute(interaction);
        }
        else {
            throw `${commandName} not accessible`;
        }
    }

    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'Something went wrong',
            ephemeral: true
        });
    }
};
