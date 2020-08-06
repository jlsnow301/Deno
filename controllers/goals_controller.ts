import {
  RouterContext,
  HttpError,
  Status,
} from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";

import { CourseGoal } from "../models/course_goal.ts";

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export async function getAllGoals(ctx: RContext) {
  const body = await renderFileToString(
    Deno.cwd() + "/views/course_goals.ejs",
    {
      title: "All Goals",
      goals: CourseGoal.findAll(),
    }
  );
  ctx.response.body = body;
}

export async function getSingleGoal(ctx: RContext) {
  const id = ctx.params.goalId!;
  const goal = CourseGoal.findById(id);
  if (!goal) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
  const body = await renderFileToString(Deno.cwd() + "/views/course_goal.ejs", {
    goal: goal,
  });
  ctx.response.body = body;
}

export async function createGoal(ctx: RContext) {
  const body = await ctx.request.body();
  const data = await body.value;
  const newGoalTitle = data.get("new-goal");
  if (newGoalTitle.trim().length === 0) {
    return ctx.response.redirect("/");
  }
  CourseGoal.create(newGoalTitle);
  ctx.response.redirect("/");
}

export async function updateGoal(ctx: RContext) {
  const body = await ctx.request.body();
  const data = await body.value;
  const updatedGoalTitle = data.get("goal-text");
  const updatedGoalId = data.get("goal-id");
  try {
    CourseGoal.update(updatedGoalId, updatedGoalTitle);
    ctx.response.redirect("/");
  } catch (err) {
    const error = new HttpError();
    error.status = Status.NotFound;
    throw error;
  }
}

export function deleteGoal(ctx: RContext) {
  const id = ctx.params.goalId!;
  CourseGoal.delete(id);
  ctx.response.redirect("/");
}
