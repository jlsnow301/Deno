import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import getDatabase from "../helpers/db.ts";

interface Resource {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export class LearningResource {
  static async create(data: Resource) {
    const id = await getDatabase().collection("resources").insertOne("data");
    return { id: id.$oid };
  }

  static async findAll() {
    const resources = await getDatabase().collection("resources").find();
    return resources.map(
      (resource: {
        _id: ObjectId;
        title: string;
        description: string;
        imageUrl: string;
        url: string;
      }) => ({
        ...resource,
        id: resource._id.$oid,
      })
    );
  }
}
