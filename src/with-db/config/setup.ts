import envs from "./envs.ts";
import { ISetup } from "./types.ts";

const env = Deno.env.get("NODE_ENV") || "development";

let setup: ISetup = {
  env,
  dbUrl: "",
  dbName: "",
  port: 8000,
  hostname: "",
};

export default Object.assign(setup, envs[`${env}_setting`]);
