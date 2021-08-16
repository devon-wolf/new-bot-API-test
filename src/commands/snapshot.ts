import { CommandInteraction } from 'discord.js';
import { makeCommand } from '../utils/commandHandler';

export default makeCommand({
    name: 'snapshot',
    description: 'replies with a snapshot of user data',
    callback: (async (interaction: CommandInteraction): Promise<void> => {
        const { member, user, channelId, guild } = interaction;

        const userObject = {
            userId: user.id,
            username: user.username,
            startTime: Date.now(),
            startChannelId: channelId
        };

        await interaction.reply(JSON.stringify(userObject));
    })
});
