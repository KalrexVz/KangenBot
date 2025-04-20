import { Collection } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCommands(prefixPath: string, slashPath: string) {
  const prefixCommands = new Collection();
  const slashCommands = new Collection();
  const slashDataArray = [];

  // Load prefix commands
  const prefixFiles = await fs.readdir(path.join(__dirname, '..', prefixPath));
  for (const file of prefixFiles) {
    const command = await import(`../${prefixPath}/${file}`);
    if (command.name && command.execute) {
      prefixCommands.set(command.name, command);
    }
  }

  // Load slash commands
  const slashFiles = await fs.readdir(path.join(__dirname, '..', slashPath));
  for (const file of slashFiles) {
    const command = await import(`../${slashPath}/${file}`);
    if (command.data && command.execute) {
      slashCommands.set(command.data.name, command);
      slashDataArray.push(command.data.toJSON());
    }
  }

  return { prefixCommands, slashCommands, slashDataArray };
}