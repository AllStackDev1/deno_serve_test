import { Application } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import Routers from "../routers/index.ts";

const app = new Application();
const routers = new Routers();

const port = 8000;

app.use(routers.routes());
app.use(routers.allowedMethods());

console.info(`
    ################################################
    \n
    💯 🔥  App started & listening on port: ${port} 🔥 💯
    💯 🔥  Go to: http://localhost:${port} 🔥 💯
    \n
    ################################################
`);

await app.listen({ port });
