import { config } from "https://deno.land/x/dotenv/mod.ts";
import { IENV } from "./types.ts";
const donenv: any = config();

const envs: IENV = {
  production_setting: {
    dbUrl: donenv.DB_URL_PROD,
    dbName: donenv.DB_NAME_PROD,
    port: parseInt(donenv.PORT_PROD),
    hostname: donenv.HOST_PROD,
  },
  development_setting: {
    dbUrl: donenv.DB_URL_DEV,
    dbName: donenv.DB_NAME_DEV,
    port: parseInt(donenv.PORT_DEV),
    hostname: donenv.HOST_DEV,
  },
  testing_setting: {
    dbUrl: donenv.DB_URL_TEST,
    dbName: donenv.DB_NAME_TEST,
    port: parseInt(donenv.PORT_TEST),
    hostname: donenv.HOST_TEST,
  },
};

export default envs;
