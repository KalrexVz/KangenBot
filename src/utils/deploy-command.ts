import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import { loadCommands } from '../handlers/commandHandler.js';

dotenv.config();

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('Registering slash commands...');

    const { slashDataArray } = await loadCommands('commands/prefix', 'commands/slash');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
      { body: slashDataArray }
    );

    console.log('Successfully registered slash commands.');
  } catch (error) {
    console.error(error);
  }
})();