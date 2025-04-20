import { Message } from 'discord.js';

export const name = 'kick';
export const description = 'Kick a user from the server';
export const execute = async (message: Message, args: string[]) => {
  if (!message.member?.permissions.has('KICK_MEMBERS')) {
    return message.reply('You do not have permission to kick members.');
  }

  const member = message.mentions.members?.first();
  if (!member) {
    return message.reply('Please mention a user to kick.');
  }

  if (!member.kickable) {
    return message.reply('I cannot kick this user.');
  }

  try {
    await member.kick();
    message.reply(`${member.user.tag} has been kicked.`);
  } catch (err) {
    message.reply('An error occurred while trying to kick the member.');
  }
};