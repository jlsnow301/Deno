import { Router, HttpError, Status } from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";

let courseGoals: { name: string; id: string }[] = [];

const router = new Router();

// READ
router.get("/", async (ctx) => {
  const body = await renderFileToString(
    Deno.cwd() + "/views/course_goals.ejs",
    {
      title: "All Goals",
      goals: courseGoals,
    }
  );
  ctx.response.body = body;
  //ctx.response.type = "text/html";
});

// READ - single element
router.get("/:goalId", async (ctx) => {
  const id = ctx.params.goalId;
  const goal = courseGoals.find((goal) => goal.id === id);
  if (!goal) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
  const body = await renderFileToString(Deno.cwd() + "/views/course_goal.ejs", {
    goal: goal,
  });
  ctx.response.body = body;
});

// CREATE
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

// UPDATE
router.post("/update-goal", async (ctx) => {
  const body = await ctx.request.body().value;
  const updatedGoalTitle = body.get(`goal-text`);
  const updatedGoalId = body.get(`goal-id`);
  const goal = courseGoals.find((goal) => goal.id === updatedGoalId);
  if (!goal) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
  goal.name = updatedGoalTitle;
  ctx.response.redirect("/");
});

// DELETE
router.post("/:goalId", async (ctx) => {
  const id = ctx.params.goalId;
  courseGoals = courseGoals.filter((goal) => goal.id !== id);
  ctx.response.redirect("/");
});

export default router;
