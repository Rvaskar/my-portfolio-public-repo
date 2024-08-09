import redis from 'redis';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

let redisClient; // Declare a variable to hold the Redis client instance

// Function to initialize the Redis client
export const initializeRedisClient = async () => {
  // Check if the Redis client is already initialized
  if (!redisClient) {
    // Create a new Redis client instance with configuration from environment variables
    redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST, // Redis server host
        port: process.env.REDIS_PORT, // Redis server port
      },
    });

    // Handle any errors that occur with the Redis client
    redisClient.on('error', (error) => {
      console.error(`Redis connection error: ${error}`);
    });

    try {
      // Attempt to connect to the Redis server
      await redisClient.connect();
      console.log('Redis connected successfully'); // Log success message
    } catch (error) {
      console.error('Failed to connect to Redis:', error); // Log error message
      throw error;  // Re-throw the error to ensure it's caught by the caller
    }
  }
  // Return the Redis client instance
  return redisClient;
};

// Function to get the Redis client instance
export const getRedisClient = () => {
  // Check if the Redis client is initialized
  if (!redisClient) {
    throw new Error('Redis client is not initialized'); // Throw an error if not initialized
  }
  // Return the Redis client instance
  return redisClient;
};
