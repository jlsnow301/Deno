import { MongoClient, Collection } from "https://deno.land/x/mongo/mod.ts";

import { MONGO_URI } from "./keys.ts";

interface collectionSchema {
  name: string;
  _id: { $oid: string };
}

let collection: Collection<collectionSchema> | null = null;

export function connect() {
  const client = new MongoClient();

  client.connectWithUri(MONGO_URI);

  const db = client.database("course-goals");
  collection = db.collection("goals");
}

export function getGoalsCollection() {
  return collection;
}

export default collection;
