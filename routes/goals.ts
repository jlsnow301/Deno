import { Router, HttpError, Status } from "https://deno.land/x/oak/mod.ts";

import {
  getAllGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goals_controller.ts";

const router = new Router();

// READ
router.get("/", getAllGoals);
// READ - single element
router.get("/:goalId", getSingleGoal);
// CREATE
router.post("/add-goal", createGoal);
// UPDATE
router.post("/update-goal", updateGoal);
// DELETE
router.post("/:goalId", deleteGoal);

export default router;
