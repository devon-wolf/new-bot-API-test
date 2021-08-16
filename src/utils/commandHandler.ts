import fs from 'fs';
import { Collection, CommandInteraction } from 'discord.js';
import { CommandObject } from '../types';

export const populateCommands = (): [CommandObject[], Collection<string, CommandObject>] => {
    const commands: CommandObject[] = [];

    const clientCommands: Collection<string, CommandObject> = new Collection();
    
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

export const executeCommand = async (interaction: CommandInteraction, clientCommands: Collection<string, CommandObject>): Promise<void> => {
    const { commandName } = interaction;
    try {
        const command = await clientCommands.get(commandName);

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
