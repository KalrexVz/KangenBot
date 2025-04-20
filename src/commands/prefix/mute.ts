import { Message, GuildMember } from 'discord.js';

export const name = 'mute';
export const description = 'Mute a user in the server';
export const execute = async (message: Message, args: string[]) => {
  if (!message.member?.permissions.has('MANAGE_ROLES')) {
    return message.reply('You do not have permission to mute members.');
  }

  const member = message.mentions.members?.first();
  if (!member) {
    return message.reply('Please mention a user to mute.');
  }

  const mutedRole = message.guild?.roles.cache.find(role => role.name === 'Muted');
  if (!mutedRole) {
    return message.reply('Muted role not found, please create it.');
  }

  try {
    await member.roles.add(mutedRole);
    message.reply(`${member.user.tag} has been muted.`);
  } catch (err) {
    message.reply('An error occurred while trying to mute the member.');
  }
};