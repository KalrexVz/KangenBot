import { Message } from 'discord.js';

export const name = 'lock';

export const description = 'Lock a channel to prevent members from sending messages';

export const execute = async (message: Message) => {

  if (!message.member?.permissions.has('MANAGE_CHANNELS')) {

    return message.reply('You do not have permission to lock this channel.');

  }

  try {

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {

      SEND_MESSAGES: false,

    });

    message.reply('The channel has been locked.');

  } catch (err) {

    message.reply('An error occurred while trying to lock the channel.');

  }

};