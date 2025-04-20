import { Message } from 'discord.js';

export const name = 'softban';
export const description = 'Softban a user from the server (ban + unban) and deletes their messages';
export const execute = async (message: Message, args: string[]) => {
  if (!message.member?.permissions.has('BAN_MEMBERS')) {
    return message.reply('You do not have permission to softban members.');
  }

  const member = message.mentions.members?.first();
  if (!member) {
    return message.reply('Please mention a user to softban.');
  }

  if (!member.bannable) {
    return message.reply('I cannot softban this user.');
  }

  try {
    // Softban: ban member, then unban immediately
    await member.ban({ reason: 'Softban' });
    await message.guild?.members.unban(member.user.id);

    // Delete their recent messages (optional, bisa ditambahin berapa pesan yang mau dihapus)
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const userMessages = messages.filter(msg => msg.author.id === member.id);
    await message.channel.bulkDelete(userMessages);

    message.reply(`${member.user.tag} has been softbanned and their messages have been deleted.`);
  } catch (err) {
    message.reply('An error occurred while trying to softban the member.');
  }
};