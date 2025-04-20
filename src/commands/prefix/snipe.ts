import { Message, EmbedBuilder } from 'discord.js';

export const name = 'esnipe';
export const description = 'Tampilkan pesan yang diedit di channel ini.';

export const execute = async (message: Message) => {
  const editsnipe = message.client.editsnipes && message.client.editsnipes[message.channel.id];

  if (!editsnipe) {
    return message.reply('Tidak ada pesan yang diedit di channel ini.');
  }

  const embed = new EmbedBuilder()
    .setTitle('Pesan yang Diedit')
    .addFields(
      { name: 'Sebelum', value: editsnipe.oldContent || '*Tidak ada konten*' },
      { name: 'Sesudah', value: editsnipe.newContent || '*Tidak ada konten*' },
      { name: 'Dari', value: `${editsnipe.author}`, inline: true },
      { name: 'Waktu', value: `<t:${Math.floor(editsnipe.time / 1000)}:R>`, inline: true }
    )
    .setColor(0xffcc00);

  message.channel.send({ embeds: [embed] });
};