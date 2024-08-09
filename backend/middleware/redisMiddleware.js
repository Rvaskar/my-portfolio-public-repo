import { getRedisClient } from "../redis.js";

// Generalized middleware function to handle Redis caching
const cacheMiddleware = (cacheKey) => {
  return async (req, res, next) => {
    try {
      // Access the Redis client
      const redisClient = getRedisClient();

      // Check if the Redis client is initialized; if not, return a server error response
      if (!redisClient) {
        return res.status(500).json({ message: 'Redis client is not initialized' });
      }

      // Try to retrieve cached data using the provided cache key
      const cachedData = await redisClient.get(cacheKey);

      // If cached data is found, parse it and send it as a response, bypassing the controller
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      // If no cache is found, proceed to the next controller handler
      next();
    } catch (error) {
      // Return a server error response if something goes wrong during the cache retrieval process
      return res.status(500).json({ message: error.message });
    }
  };
};

// Exporting specific middleware functions with predefined cache keys
export const certificateRedis = cacheMiddleware("certificate");
export const projectRedis = cacheMiddleware("project");
export const courseRedis = cacheMiddleware("course");
