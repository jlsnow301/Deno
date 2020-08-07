import { Application } from "https://deno.land/x/oak/mod.ts";

import { connect } from "./helpers/db.ts";
import resourceRoutes from "./routes/resources.ts";

connect();

const app = new Application();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE"
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content_Type");
  await next();
});

app.use(resourceRoutes.routes());
app.use(resourceRoutes.allowedMethods());

app.listen({ port: 3000 });
