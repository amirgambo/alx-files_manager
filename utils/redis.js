/**
 * Redis client
 */
import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  /**
   * Class creates redis instance
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks if connection is active
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the key
   * @param {String} key - The key to retrieve
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key and its value with an expiration time
   * @param {String} key - The key
   * @param {String | Number | Boolean} value - The value to store with key
   * @param {Number} duration - The expiration time of the item in seconds
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Deletes key
   * @param {String} key - The key to remove
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
