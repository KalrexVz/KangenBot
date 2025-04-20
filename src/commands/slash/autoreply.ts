// commands/autoreply.ts
import { SlashCommandBuilder } from 'discord.js';
import AutoReply from '../../schemas/AutoReply.js';

export const data = new SlashCommandBuilder()
  .setName('autoreply')
  .setDescription('Daftarkan auto-reply ke bot')
  .addStringOption(opt =>
    opt.setName('trigger')
      .setDescription('Kata yang memicu balasan')
      .setRequired(true)
  )
  .addStringOption(opt =>
    opt.setName('response')
      .setDescription('Balasan dari bot')
      .setRequired(true)
  );

export async function execute(interaction: any) {
  const trigger = interaction.options.getString('trigger')?.toLowerCase();
  const response = interaction.options.getString('response');
  const guildId = interaction.guildId;

  const existing = await AutoReply.findOne({ guildId, trigger });
  if (existing) {
    return interaction.reply({ content: 'Trigger ini sudah terdaftar!', ephemeral: true });
  }

  await AutoReply.create({ guildId, trigger, response });
  await interaction.reply({ content: `Auto-reply untuk **${trigger}** berhasil disimpan!`, ephemeral: true });
}