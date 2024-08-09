import { getRedisClient } from "../redis.js";

// Generalized middleware function to handle Redis caching
const cacheMiddleware = (cacheKey) => {
  return async (req, res, next) => {
    try {
      // Access the Redis client
      const redisClient = getRedisClient();

      if (!redisClient) {
        return res.status(500).json({ message: 'Redis client is not initialized' });
      }

      // Try to retrieve cached data
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      // If no cache is found, proceed to the next controller handler
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};

// Exporting specific middleware functions
export const certificateRedis = cacheMiddleware("certificate");
export const projectRedis = cacheMiddleware("project");
export const courseRedis = cacheMiddleware("course");
