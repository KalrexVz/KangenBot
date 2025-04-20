// commands/autoreplylist.ts
import { SlashCommandBuilder } from 'discord.js';
import AutoReply from '../../schemas/AutoReply.js';

export const data = new SlashCommandBuilder()
  .setName('autoreplylist')
  .setDescription('Lihat semua trigger auto-reply di server ini');

export async function execute(interaction: any) {
  const guildId = interaction.guildId;

  const replies = await AutoReply.find({ guildId });

  if (replies.length === 0) {
    return interaction.reply({ content: 'Belum ada auto-reply yang terdaftar.', ephemeral: true });
  }

  const list = replies.map((r, i) => `\`${i + 1}.\` **${r.trigger}** → ${r.response}`).join('\n');

  await interaction.reply({ content: `Daftar auto-reply:\n${list}`, ephemeral: true });
}