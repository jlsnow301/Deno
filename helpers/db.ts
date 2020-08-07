import { MongoClient, Database } from "https://deno.land/x/mongo/mod.ts";
import { MONGO_URI } from "../config/keys.ts";

let database: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(MONGO_URI);
  database = client.database("learning_resources");
}

function getDb() {
  return database;
}

export default getDb;
