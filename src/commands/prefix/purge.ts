import { Message } from 'discord.js';

export const name = 'purge';

export const description = 'Delete a number of messages from the channel';

export const execute = async (message: Message, args: string[]) => {

  if (!message.member?.permissions.has('MANAGE_MESSAGES')) {

    return message.reply('You do not have permission to delete messages.');

  }

  const amount = parseInt(args[0]);

  if (isNaN(amount) || amount <= 0 || amount > 100) {

    return message.reply('Please provide a number between 1 and 100 for the amount of messages to delete.');

  }

  try {

    await message.channel.bulkDelete(amount, true);

    message.reply(`Successfully deleted ${amount} messages.`);

  } catch (err) {

    message.reply('An error occurred while trying to delete messages.');

  }

};