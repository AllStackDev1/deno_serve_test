import {
  Router,
  isHttpError,
  Status,
} from "https://deno.land/x/oak@v4.0.0/mod.ts";

import endpoints from "./endpoints.ts";
import IEndpoint from "./interface.ts";

export default class Routers extends Router {
  constructor() {
    super();
    this.init();
  }

  __call(method: string, args: any) {
    console.log(`'${method}()' is missing!`);
  }

  init() {
    endpoints.forEach((endpoint: IEndpoint) => {
      endpoint.methods.forEach((method) => {
        this[method](`/${endpoint.route}`, ...endpoint.middlewares[method]!);
      });
      this.all(`/${endpoint.route}`, (context: any) => {
        context.response.body = "Method not allowed!";
        context.response.status = 405;
      });
    });
  }
}
