import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getResources,
  addResource,
  updateResource,
  deleteResource,
} from "../controllers/resources.ts";

const router = new Router();

router.get("/resources", getResources);

router.post("resources", addResource);

router.patch("/resources/:resourceId", updateResource);

router.delete("/resources/:resourceId", deleteResource);

export default router;
