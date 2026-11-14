// import {MongoClient} from 'mongodb';
import 'dotenv/config';
import client from './client.js'

const db = client.db('AH20232CP1')

export default db