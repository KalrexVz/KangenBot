// commands/autoreplyremove.ts
import { SlashCommandBuilder } from 'discord.js';
import AutoReply from '../../schemas/AutoReply.js';

export const data = new SlashCommandBuilder()
  .setName('autoreplyremove')
  .setDescription('Hapus auto-reply dari trigger tertentu')
  .addStringOption(opt =>
    opt.setName('trigger')
      .setDescription('Trigger yang mau dihapus')
      .setRequired(true)
  );

export async function execute(interaction: any) {
  const trigger = interaction.options.getString('trigger')?.toLowerCase();
  const guildId = interaction.guildId;

  const deleted = await AutoReply.findOneAndDelete({ guildId, trigger });

  if (!deleted) {
    return interaction.reply({ content: 'Trigger tidak ditemukan.', ephemeral: true });
  }

  await interaction.reply({ content: `Auto-reply untuk **${trigger}** berhasil dihapus.`, ephemeral: true });
}