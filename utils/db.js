/**
 * Mongo db client
 */
import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

class DBClient {
  /**
   * Class creates db instance
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks connection to DB
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Obtains number of users in DB
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Obtains number of files in db
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Reference user collection
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Reference Files connection
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
