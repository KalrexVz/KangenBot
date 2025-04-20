import { Message } from 'discord.js';

export const name = 'chaosjomblo';

export const description = 'Simulasi nasib cinta jomblo yang penuh tragedi.';

export const execute = async (message: Message) => {
  const guild = message.guild;

  if (!guild) return;

  const members = guild.members.cache.filter(m => !m.user.bot && m.id !== message.author.id).map(m => m.user);

  const random_user = members.length > 0
    ? members[Math.floor(Math.random() * members.length)]
    : message.author;

  const responses = [
    `**[Tembakan Gagal]**\nKamu nembak ${random_user}, tapi dia malah ngajak kamu jadi bestie selamanya.`,
    `**[Dosa Mantan]**\nMantanmu pernah ngajak balikan... tapi lupa namamu.`,
    `**[Doa Jomblo]**\nYa Tuhan... jangan biarkan aku chatting duluan lagi. Aku capek digantung.`,
    `**[Stalking Report]**\n${random_user} scrolling TikTok 3 jam tapi gak buka chat darimu yang cuma 'halo'.`,
    `**[Jodoh Simulasi]**\nKamu dijodohkan dengan ${random_user}. Kecocokan: ${Math.floor(Math.random() * 51) + 10}%. Kalian cocok... jadi musuh bebuyutan.`,
    `**[Saran Hidup]**\nKalau hidupmu pahit, jangan salahin cinta. Salahkan algoritma semesta.`,
    `**[Malaikat Jodoh]**\nMalaikat Jodoh sedang AFK. Silakan coba lagi setelah kamu glow up.`,
    `**[Kabar Jodoh]**\nJodohmu lagi nge-date sama orang lain. Kamu di rumah nonton podcast cinta sendiri.`,
    `**[Ramalan Jomblo]**\nHari ini kamu akan melihat pasangan mesra... lalu iri... lalu lanjut scroll.`
  ];

  const response = responses[Math.floor(Math.random() * responses.length)];

  message.channel.send(response);
};