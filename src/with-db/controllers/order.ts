import { IOption } from "./types.ts";
import { Repository, MainController } from "../lib/index.ts";

class Order extends MainController {
  protected repo: IOption = {};
  protected name: string = "";
  constructor(repo: IOption, name: string) {
    super(repo, name);
    this.repo = repo;
    this.name = name;
  }
}

export default new Order(new Repository("order"), "Order");
