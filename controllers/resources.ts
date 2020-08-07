import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import { LearningResource } from "../models/learning_resources.ts";

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export async function getResources(ctx: RContext) {
  const resources = await LearningResource.findAll();
  ctx.response.body = { resources: resources };
}

export async function addResource(ctx: RContext) {
  const data = await ctx.request.body();
  const body = await data.value;
  const title = body?.title;
  const desc = body?.description;
  const imageUrl = body?.imageUrl;
  const resourceUrl = body?.url;
  const id = await LearningResource.create({
    title: title,
    description: desc,
    imageUrl: imageUrl,
    url: resourceUrl,
  });
  ctx.response.body = { insertedResource: id };
}

export async function updateResource(ctx: RContext) {
  const data = await ctx.request.body();
  const body = await data.value;
  const title = body?.title;
  const desc = body?.description;
  const imageUrl = body?.imageUrl;
  const resourceUrl = body?.url;
  const id = ctx.params.resourceId!;

  LearningResource.update(id, {
    title: title,
    description: desc,
    imageUrl: imageUrl,
    url: resourceUrl,
  });
  ctx.response.body = {
    message: "Updated resource!",
    updatedResource: {
      title: title,
      description: desc,
      imageUrl: imageUrl,
      url: resourceUrl,
      id: id,
    },
  };
}

export async function deleteResource(ctx: RContext) {
  const id = ctx.params.resourceId!;
  await LearningResource.delete(id);
  ctx.response.body = { message: "Deleted resource!" };
}
