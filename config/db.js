import {MongoClient} from 'mongodb';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);
const db = client.db('AH20232CP1');

export default db;