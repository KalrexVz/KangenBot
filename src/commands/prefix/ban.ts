import { Message } from 'discord.js';

export const name = 'ban';
export const description = 'Ban a user from the server';
export const execute = async (message: Message, args: string[]) => {
  if (!message.member?.permissions.has('BAN_MEMBERS')) {
    return message.reply('You do not have permission to ban members.');
  }

  const member = message.mentions.members?.first();
  if (!member) {
    return message.reply('Please mention a user to ban.');
  }

  if (!member.bannable) {
    return message.reply('I cannot ban this user.');
  }

  try {
    await member.ban();
    message.reply(`${member.user.tag} has been banned.`);
  } catch (err) {
    message.reply('An error occurred while trying to ban the member.');
  }
};