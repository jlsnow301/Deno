import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const router = new Router();

router.get(`/`, (ctx) => {
  ctx.response.body = `
        <h2>Course Goals</h2>
        <form action="/add-goal" method="POST">
            <input type="text" name="new-goal">
            <button type="submit">Add Goal</button>
        </form>
    `;
  ctx.response.type = "text/html";
});

router.post(`/add-goal`, async (ctx) => {
  const body = await ctx.request.body();
  const newGoal = body.value.get(`new-goal`);
  console.log(newGoal);
  ctx.response.redirect(`/`);
});

app.use(async (ctx, next) => {
  console.log(`My middleware`);
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 3000 });
