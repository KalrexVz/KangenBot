import { Message } from 'discord.js';

export const name = 'howgay';
export const description = 'Cek seberapa gay seseorang!';

export const execute = async (message: Message, args: string[]) => {
  const target = message.mentions.users.first() || message.author;
  const percentage = Math.floor(Math.random() * 101);
  let description = '';

  if (percentage === 0) {
    description = 'Gak gay sama sekali.';
  } else if (percentage <= 20) {
    description = 'Sedikit gay, tapi bisa jadi cuma salah paham.';
  } else if (percentage <= 40) {
    description = 'Lumayan gay, udah keliatan dikit-dikit.';
  } else if (percentage <= 60) {
    description = 'Setengah gay, setengah straight.';
  } else if (percentage <= 80) {
    description = 'Gay banget! Udah gak bisa disembunyiin.';
  } else if (percentage < 100) {
    description = 'Super gay! Pride parade material.';
  } else {
    description = '100% gay. Kamu adalah gay incarnate!';
  }

  message.channel.send({
    content: `${target} adalah **${percentage}%** gay!\n${description}`,
  });
};