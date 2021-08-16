import fs from 'fs';
import { Collection } from 'discord.js';
import { CommandObject } from '../types';

const populateCommands = (collection: Collection<string, CommandObject>): void => {
    const commandFiles = fs
        .readdirSync(`${__dirname}/../commands`)
        .filter(file =>
            file.endsWith('.js') ||
        file.endsWith('.ts'));


    for (const file of commandFiles) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command = require(`${__dirname}/../commands/${file}`);

        collection.set(command.default.data.name, command);
    }
};

export default populateCommands;
