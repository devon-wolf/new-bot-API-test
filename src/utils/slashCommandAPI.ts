import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { CommandObject } from '../types';

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
    
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    try {
        console.log('Started refreshing application commands');
        
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.DEV_GUILD_ID),
            { body: commands }
        );
        
        console.log('Successfully reloaded application commands');
    }
    catch (error) {
        console.error(error);
    }
};
