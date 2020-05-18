import { Repository, MainController } from "../lib/index.ts";
import { OrderModel } from "../models/index.ts";

class Order extends MainController {
  protected repo = {} as any;
  constructor(repo: {}) {
    super(repo);
    this.repo = repo;
  }
}

export default new Order(new Repository(OrderModel));
