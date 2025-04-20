import { Message } from 'discord.js';

export const name = 'carijodoh';
export const description = 'Cari jodoh berdasarkan role (male/female)!';

export const execute = async (message: Message) => {
  const member = message.member;
  const guild = message.guild;

  if (!member || !guild) return;

  const maleRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'male');
  const femaleRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'female');

  if (!maleRole || !femaleRole) {
    return message.reply('Role "male" dan "female" harus ada dulu di server.');
  }

  const isMale = member.roles.cache.has(maleRole.id);
  const isFemale = member.roles.cache.has(femaleRole.id);

  if (!isMale && !isFemale) {
    return message.reply('Kamu harus punya role **male** atau **female** dulu buat cari jodoh.');
  }

  // Biar gak bisa cari sesama jenis
  if ((isMale && !femaleRole) || (isFemale && !maleRole)) {
    return message.reply('Jodohmu belum tersedia di server ini!');
  }

  // Tentukan target role berdasarkan gender user
  const targetRole = isMale ? femaleRole : maleRole;

  // Cari kandidat lawan jenis, bukan diri sendiri
  const candidates = guild.members.cache
    .filter(m => m.roles.cache.has(targetRole.id) && m.id !== member.id)
    .map(m => m.user);

  if (candidates.length === 0) {
    return message.reply('Belum ada jodoh lawan jenis yang tersedia. Sabar ya!');
  }

  const maleToFemale = [
    `**{author}** menemukan putri impiannya: **{target}**!`,
    `Dari sekian banyak bidadari, hati **{author}** cuma untuk **{target}**.`,
    `**{author}** gak bisa bohong... **{target}** udah nyuri hatinya!`,
  ];

  const femaleToMale = [
    `**{author}** gak nyangka, pangeran impiannya ternyata **{target}**!`,
    `**{target}**, hati-hati... **{author}** udah naksir berat!`,
    `**{author}** langsung klepek-klepek liat **{target}**!`,
  ];

  const responses = isMale ? maleToFemale : femaleToMale;

  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  const template = responses[Math.floor(Math.random() * responses.length)];
  const result = template
    .replace('{author}', `${message.author}`)
    .replace('{target}', `${chosen}`);

  message.channel.send(result);
};