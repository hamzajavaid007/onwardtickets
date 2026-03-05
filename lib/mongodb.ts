import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

let cached = global as typeof globalThis & {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(MONGODB_URI).catch((err) => {
      cached.mongoose.promise = null;
      throw err;
    });
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (err) {
    cached.mongoose.promise = null;
    throw err;
  }

  return cached.mongoose.conn;
}

export default dbConnect;
