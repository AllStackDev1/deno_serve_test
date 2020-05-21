import { IOption } from "./types.ts";
import { Repository, MainController } from "../lib/index.ts";
import { UserModel } from "../models/index.ts";

class User extends MainController {
  protected repo: IOption = {};
  protected name: string = "";
  constructor(repo: IOption, name: string) {
    super(repo, name);
    this.repo = repo;
    this.name = name;
  }
}

export default new User(new Repository(UserModel), "User");
