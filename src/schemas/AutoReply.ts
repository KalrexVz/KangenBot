// schemas/AutoReply.ts
import mongoose from 'mongoose';

const autoReplySchema = new mongoose.Schema({
  guildId: String,
  trigger: String,
  response: String,
});

export default mongoose.models.AutoReply || mongoose.model('AutoReply', autoReplySchema);