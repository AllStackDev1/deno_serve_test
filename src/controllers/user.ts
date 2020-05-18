import { Repository, MainController } from "../lib/index.ts";
import { UserModel } from "../models/index.ts";

class User extends MainController {
  protected repo = {} as any;
  constructor(repo: {}) {
    super(repo);
    this.repo = repo;
  }
}

export default new User(new Repository(UserModel));
