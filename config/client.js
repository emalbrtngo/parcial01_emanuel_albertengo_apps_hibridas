import {MongoClient} from 'mongodb';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const client = new MongoClient(MONGO_URI)
export default client;
