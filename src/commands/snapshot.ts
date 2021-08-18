import { CommandInteraction } from 'discord.js';
import { makeCommand } from '../utils/commandHandler';

export default makeCommand({
    name: 'snapshot',
    description: 'replies with a snapshot of user data',
    callback: (async (interaction: CommandInteraction): Promise<void> => {
        const { member, user, channelId } = interaction;

        // TODO figure out how to deal with the extra type that flags nickname as an error
        const userObject = {
            userId: user.id,
            username: user.username,
            startTime: Date.now(),
            startChannelId: channelId,
            startNickname: member?.nickname
        };

        await interaction.reply(JSON.stringify(userObject));
    })
});
