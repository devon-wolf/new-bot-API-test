import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { CommandObject } from '../types';

const token = process.env.TOKEN || '';
const clientId = process.env.CLIENT_ID || '';
const guildId = process.env.DEV_GUILD_ID || '';

const rest = new REST({ version: '9' }).setToken(token);

export const setApplicationCommands = async (commands: CommandObject[]): Promise<void> => {
    if (
        !process.env.TOKEN || 
        !process.env.CLIENT_ID || 
        !process.env.DEV_GUILD_ID
    ) {
        console.log(
            'Missing credentials, stopping command loading'
        );
        return;
    }

    try {
        console.log('Started refreshing application commands');
        
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );
        
        console.log('Successfully reloaded application commands');
    }
    catch (error) {
        console.error(error);
    }
};
