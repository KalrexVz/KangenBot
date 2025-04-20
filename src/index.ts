import { Client, GatewayIntentBits, Collection, Events, REST, Routes, ActivityType } from 'discord.js';
import * as dotenv from 'dotenv';
import { loadCommands } from './handlers/commandHandler.js';
import { connectDB } from './utils/database.js'; // pastikan path sesuai
dotenv.config();

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const prefix = process.env.PREFIX!;
const { prefixCommands, slashCommands, slashDataArray } = await loadCommands('commands/prefix', 'commands/slash');

// Menambahkan properti untuk snipes dan editsnipes di client
client.snipes = {};
client.editsnipes = {};

// Connect ke MongoDB sebelum login
await connectDB();

// Event: ketika client sudah siap
client.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user?.tag}`);
  client.user?.setPresence({
    activities: [{ name: 'Jombloer House', type: ActivityType.Watching }],
    status: 'dnd',
  });

  // Register slash commands
  const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
      { body: slashDataArray }
    );
    console.log('Slash commands registered');
  } catch (err) {
    console.error(err);
  }
});

// Event: untuk menangani command slash
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = slashCommands.get(interaction.commandName);
  if (command) {
    await command.execute(interaction);
  }
});

// Event: untuk menangani command prefix
client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  // AutoReply handler
  if (message.guild) {
    const content = message.content.toLowerCase();
    const reply = await AutoReply.findOne({ guildId: message.guild.id, trigger: content });
    if (reply) {
      return message.channel.send(reply.response);
    }
  }
  
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();
  const command = prefixCommands.get(commandName);
  if (command) {
    command.execute(message, args);
  }
});

// Event: menangani pesan yang dihapus
client.on('messageDelete', (message) => {
  if (message.partial) return; // Menghindari error jika pesan belum lengkap

  // Menyimpan pesan yang dihapus
  client.snipes[message.channel.id] = {
    content: message.content,
    author: message.author.username,
    time: new Date(),
  };
});

// Event: menangani pesan yang diedit
client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content || oldMessage.partial || newMessage.partial) return;

  // Menyimpan pesan yang diedit
  client.editsnipes[oldMessage.channel.id] = {
    oldContent: oldMessage.content,
    newContent: newMessage.content,
    author: oldMessage.author.username,
    time: new Date(),
  };
});

// Login ke Discord menggunakan token
client.login(process.env.DISCORD_TOKEN);