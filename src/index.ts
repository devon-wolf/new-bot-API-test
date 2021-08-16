import { Client, Intents } from 'discord.js';
import { setApplicationCommands } from './utils/slashCommandAPI';
import { executeCommand, populateCommands } from './utils/commandHandler';

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
    executeCommand(interaction, clientCommands);
});

client.login(process.env.TOKEN);
