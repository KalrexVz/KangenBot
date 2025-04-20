import { Message } from 'discord.js';

export const name = 'unlock';

export const description = 'Unlock a channel to allow members to send messages';

export const execute = async (message: Message) => {

  if (!message.member?.permissions.has('MANAGE_CHANNELS')) {

    return message.reply('You do not have permission to unlock this channel.');

  }

  try {

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {

      SEND_MESSAGES: true,

    });

    message.reply('The channel has been unlocked.');

  } catch (err) {

    message.reply('An error occurred while trying to unlock the channel.');

  }

};