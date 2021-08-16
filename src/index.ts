import fs from 'fs';
import { Client, Collection, Intents } from 'discord.js';
import { CommandObject } from './types';
import { setApplicationCommands } from './utils/slashCommands';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS],
});

const commands: CommandObject[] = [];

const clientCommands: Collection<string, CommandObject> = new Collection();

const commandFiles = fs
    .readdirSync(`${__dirname}/commands`)
    .filter(file =>
        file.endsWith('.js') ||
            file.endsWith('.ts'));

for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`${__dirname}/commands/${file}`);

    commands.push(command.default.data.toJSON());

    clientCommands.set(command.default.data.name, command);
}

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
