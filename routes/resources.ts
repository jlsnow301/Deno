import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getResources,
  addResource,
  updateResource,
  deleteResource,
} from "../controllers/resources.ts";

const router = new Router();

router.get("/resources");

router.post("resources");

router.patch("/resources");

router.delete("/resources");

export default router;
