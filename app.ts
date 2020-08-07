import { Application } from "https://deno.land/x/oak/mod.ts";

import { connect } from "./helpers/db.ts";
import resourceRoutes from "./routes/resources.ts";

connect();

const app = new Application();

app.use(resourceRoutes.routes());
app.use(resourceRoutes.allowedMethods());

app.listen({ port: 3000 });
