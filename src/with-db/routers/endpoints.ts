import { IEndpoint } from "./types.ts";
import { UserController } from "../controllers/index.ts";

const Testing = (context: any, next: Function) => {
  context.response.body = "Hello World Test";
  next();
};

const enpoints: Array<IEndpoint> = [
  {
    route: "",
    methods: ["get"],
    middlewares: {
      get: [Testing, () => console.log("hello")],
    },
  },
  {
    route: "users",
    methods: ["post", "get"],
    middlewares: {
      post: [UserController.insertOne.bind(UserController)],
      get: [UserController.get.bind(UserController)],
    },
  },
  {
    route: "users/:_id",
    methods: ["get", "patch", "delete"],
    middlewares: {
      get: [UserController.getById.bind(UserController)],
      patch: [UserController.update.bind(UserController)],
      delete: [UserController.delete.bind(UserController)],
    },
  },
];

export default enpoints;
