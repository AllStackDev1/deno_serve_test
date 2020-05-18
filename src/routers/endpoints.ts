import IEndpoint from "./interface.ts";
import { UserController, OrderController } from "../controllers/index.ts";

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
    methods: ["post", "get", "delete"],
    middlewares: {
      post: [UserController.insert.bind(UserController)],
      get: [UserController.get.bind(UserController)],
      delete: [UserController.drop.bind(UserController)],
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
  {
    route: "orders",
    methods: ["post", "get", "delete"],
    middlewares: {
      post: [OrderController.insert.bind(OrderController)],
      get: [OrderController.get.bind(OrderController)],
      delete: [OrderController.drop.bind(OrderController)],
    },
  },
  {
    route: "orders/:_id",
    methods: ["get", "patch", "delete"],
    middlewares: {
      get: [OrderController.getById.bind(OrderController)],
      patch: [OrderController.update.bind(OrderController)],
      delete: [OrderController.delete.bind(OrderController)],
    },
  },
];

export default enpoints;
