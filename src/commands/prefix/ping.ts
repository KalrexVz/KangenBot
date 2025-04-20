import { Message } from 'discord.js';

export const name = 'ping';
export const execute = (message: Message) => {
  message.reply('Pong!');
};