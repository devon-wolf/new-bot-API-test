import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import { CommandObject } from './types';
import { setApplicationCommands } from './utils/slashCommands';
import populateCommands from './utils/commandHandler';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

const [commands, clientCommands] = populateCommands();

client.once('ready', () => {
    setApplicationCommands(commands);
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const { commandName } = interaction;
    if (!clientCommands.has(commandName)) return;

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
});

client.login(process.env.TOKEN);
