import { Router } from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";

const courseGoals: { name: string; id: string }[] = [];

const router = new Router();

router.get("/", async (ctx) => {
  const body = await renderFileToString(Deno.cwd() + "/course_goals.ejs", {
    title: "All Goals",
    goals: courseGoals,
  });
  ctx.response.body = body;
  //ctx.response.type = "text/html";
});

router.post("/add-goal", async (ctx) => {
  const body = await ctx.request.body().value;
  const newGoalTitle = body.get(`new-goal`);
  if (newGoalTitle.trim().length === 0) {
    return ctx.response.redirect("/");
  }
  const newGoal = { id: new Date().toISOString(), name: newGoalTitle };
  courseGoals.push(newGoal);
  console.log(newGoal);
  ctx.response.redirect("/");
});

export default router;
