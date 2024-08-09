import redis from 'redis';
import dotenv from "dotenv";

dotenv.config();

let redisClient;

export const initializeRedisClient = async () => {
  if (!redisClient) {
    redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    redisClient.on('error', (error) => {
      console.error(`Redis connection error: ${error}`);
    });

    try {
      await redisClient.connect();
      console.log('Redis connected successfully');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw error;  // Re-throw to ensure the error is caught by the caller
    }
  }
  return redisClient;
};

// Export a function to get the Redis client
export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client is not initialized');
  }
  return redisClient;
};
