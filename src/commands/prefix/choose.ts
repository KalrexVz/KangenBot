import { Message } from 'discord.js';

export const name = 'choose';

export const description = 'Bantu kamu milih antara beberapa pilihan!';

export const execute = async (message: Message, args: string[]) => {
  const input = args.join(' ').split('|').map(opt => opt.trim()).filter(Boolean);

  if (input.length < 2) {
    return message.reply('Tolong kasih setidaknya dua pilihan, pisahkan dengan `|`.\nContoh: `!choose apel | ikan | nasi goreng`');
  }

  const choice = input[Math.floor(Math.random() * input.length)];

  message.channel.send(`Aku pilih: **${choice}**`);
};