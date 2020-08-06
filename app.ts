import {
  Application,
  send,
  isHttpError,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";

import goalsRouter from "./routes/goals.ts";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    if (isHttpError(err) && err.status === Status.NotFound) {
      const body = await renderFileToString(
        Deno.cwd() + "/views/not_found.ejs",
        {}
      );
      ctx.response.body = body;
    } else {
      ctx.response.body =
        "Something went wrong, sorry! Please try again later!";
    }
  }
});

app.use(async (ctx, next) => {
  console.log("My middleware");
  await next();
});

app.use(goalsRouter.routes());
app.use(goalsRouter.allowedMethods());

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname);
});

app.listen({ port: 3000 });
