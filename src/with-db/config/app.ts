import { Application } from "../deps.ts";
import setup from "./setup.ts";
import Routers from "../routers/index.ts";

const app = new Application();
const routers = new Routers();

app.use(routers.routes());
app.use(routers.allowedMethods());

console.info(`
    ################################################
    \n
    💯 🔥  App started & listening on port: ${setup.port} 🔥 💯
    💯 🔥  Go to: http://localhost:${setup.port} 🔥 💯
    \n
    ################################################
`);

await app.listen({ port: setup.port });
