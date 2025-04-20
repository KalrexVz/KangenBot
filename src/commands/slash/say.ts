import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  MessageFlags,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('say')
  .setDescription('Kirim pesan sebagai bot (admin hanya)')
  .addStringOption(option =>
    option.setName('message')
      .setDescription('Pesan yang akan dikirim')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('message_id')
      .setDescription('ID pesan yang ingin di-reply (opsional)')
  )
  .addUserOption(option =>
    option.setName('target')
      .setDescription('Mention user tertentu (opsional)')
  )
  .addAttachmentOption(option =>
    option.setName('attachment')
      .setDescription('Lampirkan file (opsional)')
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({
      content: 'You do not have permission to use this command!',
      flags: MessageFlags.Ephemeral,
    });
  }

  const message = interaction.options.getString('message', true);
  const messageId = interaction.options.getString('message_id');
  const target = interaction.options.getUser('target');
  const attachment = interaction.options.getAttachment('attachment');

  let replyContent = target ? `${target}, ${message}` : message;
  let replyOptions: any = {
    content: replyContent,
    files: attachment ? [attachment.url] : [],
  };

  if (messageId) {
    try {
      const targetMsg = await interaction.channel?.messages.fetch(messageId);
      if (targetMsg) {
        replyOptions.reply = { messageReference: targetMsg.id };
      }
    } catch (err) {
      console.warn(`Gagal fetch message ID: ${messageId}`, err);
    }
  }

  await interaction.reply({
    content: 'Mengirim pesan...',
    flags: MessageFlags.Ephemeral,
  });

  await interaction.channel?.send(replyOptions);
  await interaction.deleteReply();
}