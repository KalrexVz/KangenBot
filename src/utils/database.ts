// utils/database.ts
import mongoose from 'mongoose';

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MongoDB URI belum di-set di .env');

  await mongoose.connect(uri, {
    dbName: 'botdb', // kamu bisa ganti ini
  });

  console.log('[MongoDB] Connected');
}