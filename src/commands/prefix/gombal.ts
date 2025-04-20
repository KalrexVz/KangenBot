import { Message } from 'discord.js';
import fetch from 'node-fetch';

export const name = 'gombal';
export const description = 'Kasih gombalan manis buat gebetan~';

export const execute = async (message: Message) => {
  try {
    const response = await fetch('https://testwary.vercel.app/api/gombal');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    const gombal = json?.data?.gombal_wrd;

    if (!gombal) {
      return message.reply('Gagal ambil gombalan, coba lagi nanti!');
    }

    const target = message.mentions.users.first();
    const content = target
      ? `**${message.author} ke ${target}:**\n${gombal}` // pakai mention langsung
      : `**Gombalan buat kamu:**\n${gombal}`;

    await message.channel.send(content);
  } catch (err) {
    console.error('Gagal fetch gombal:', err);
    await message.reply('Lagi error waktu ambil gombalan, sabar ya...');
  }
};