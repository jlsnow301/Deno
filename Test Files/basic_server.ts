import { serve } from "http/server.ts";

const server = serve({ port: 5000 });

for await (const request of server) {
  request.respond({ body: `Message from Deno!` });
}
