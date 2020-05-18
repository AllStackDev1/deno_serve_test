import { Application } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import Routers from "../routers/index.ts";

const app = new Application();
const routers = new Routers();

app.use(routers.routes());
app.use(routers.allowedMethods());

await app.listen({ port: 8000 });
