import fs from 'fs';
import { Collection, CommandInteraction } from 'discord.js';
import { CommandExport, CommandObject } from '../types';

export const populateCommands = (): [CommandObject[], Collection<string, CommandExport>] => {
    const commands: CommandObject[] = [];

    const clientCommands: Collection<string, CommandExport> = new Collection();
    
    const commandFiles = fs
        .readdirSync(`${__dirname}/../commands`)
        .filter(file =>
            file.endsWith('.js') ||
                file.endsWith('.ts'));
    
    for (const file of commandFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(`${__dirname}/../commands/${file}`);
    
        commands.push(command.default.data.toJSON());
    
        clientCommands.set(command.default.data.name, command);
    }

    return [commands, clientCommands];
};

export const executeCommand = async (interaction: CommandInteraction, clientCommands: Collection<string, CommandExport>): Promise<void> => {
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
