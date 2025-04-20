import { Message } from 'discord.js';

export const name = 'unmute';

export const description = 'Unmute a user in the server';

export const execute = async (message: Message, args: string[]) => {

  if (!message.member?.permissions.has('MANAGE_ROLES')) {

    return message.reply('You do not have permission to unmute members.');

  }

  const member = message.mentions.members?.first();

  if (!member) {

    return message.reply('Please mention a user to unmute.');

  }

  const mutedRole = message.guild?.roles.cache.find(role => role.name === 'Muted');

  if (!mutedRole) {

    return message.reply('Muted role not found, please create it.');

  }

  try {

    await member.roles.remove(mutedRole);

    message.reply(`${member.user.tag} has been unmuted.`);

  } catch (err) {

    message.reply('An error occurred while trying to unmute the member.');

  }

};