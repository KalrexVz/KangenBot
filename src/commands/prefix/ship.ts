import { Message } from 'discord.js';

export const name = 'ship';
export const description = 'Cek tingkat kecocokan antara dua orang!';

export const execute = async (message: Message, args: string[]) => {
  const users = message.mentions.users;

  if (users.size < 2) {
    return message.reply('Tolong mention dua orang yang mau di-ship.');
  }

  const [user1, user2] = users.map(u => `<@${u.id}>`);
  const percentage = Math.floor(Math.random() * 101);
  let description = '';
  let emoji = '';

  if (percentage < 20) {
    description = 'Hmmm... mungkin cuma temenan aja.';
    emoji = '💔';
  } else if (percentage < 40) {
    description = 'Ada chemistry dikit sih, tapi masih jauh.';
    emoji = '❤️‍🩹';
  } else if (percentage < 60) {
    description = 'Lumayan cocok! Tinggal usaha dikit lagi.';
    emoji = '💖';
  } else if (percentage < 80) {
    description = 'Wah, kalian cocok banget! Tinggal nembak nih.';
    emoji = '💕';
  } else if (percentage < 100) {
    description = 'SOULMATE alert! Cepet jadian lah!';
    emoji = '💞';
  } else {
    description = '100% MATCH! Kalian ditakdirkan bersama!';
    emoji = '❤️';
  }

  message.channel.send({
    content: `**${user1}** x **${user2}**\nKecocokan: **${percentage}%** ${emoji}\n${description}`,
  });
};