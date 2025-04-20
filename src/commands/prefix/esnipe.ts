import { Message } from 'discord.js';

export const name = 'esnipe';

export const description = 'Tampilkan pesan yang diedit di channel ini.';

export const execute = async (message: Message) => {
  const editsnipe = message.client.editsnipes && message.client.editsnipes[message.channel.id];

  if (!editsnipe) {
    return message.reply('Tidak ada pesan yang diedit di channel ini.');
  }

  message.channel.send({
    content: `**Pesan yang diedit**:\n*Dulu*: "${editsnipe.oldContent}"\n*Sekarang*: "${editsnipe.newContent}"\n**Dari**: ${editsnipe.author}\n**Waktu**: ${editsnipe.time}`,
  });
}; 