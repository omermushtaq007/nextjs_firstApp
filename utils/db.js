import { MongoClient } from 'mongodb';
const MONGODB_URI = process.env.DATABASE_URL;
const  MONGODB_DB= "ems-demo";
// console.log(process.env.NAME_DATA)
if (!MONGODB_URI) {
  throw new Error('Not Connected!!!');
}

if (!MONGODB_DB) {
  throw new Error(`Not Connected!!! :  ${MONGODB_DB}`);
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);
  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
