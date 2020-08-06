import { MongoClient, Collection } from "https://deno.land/x/mongo/mod.ts";

import { MONGO_URI } from "./keys.ts";

let collection: Collection | null = null;

export function connect() {
  const client = new MongoClient();

  client.connectWithUri(MONGO_URI);

  const db = client.database("course-goals");
  collection = db.collection("goals");
}

function getCollection() {
  return collection;
}

export default collection;
