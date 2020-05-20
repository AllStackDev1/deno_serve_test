import { MultiFilter } from "../helpers/index.ts";
import { IOption } from "./types.ts";

export default class Repo {
  private model: Array<{}>;
  constructor(model: Array<{}>) {
    this.model = model;
    this.insert = this.insert.bind(this);
    this.getById = this.getById.bind(this);
    this.getOne = this.getOne.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  __call(method: string, args: any) {
    console.log(`'${method}()' is missing!`);
  }

  async insert(doc: {}) {
    try {
      return this.model.push(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getById(_id: string) {
    try {
      const result = this.model.filter((item: IOption) => item._id === _id);
      return result.length ? result[0] : null;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getOne(filter: {} = {}) {
    try {
      return MultiFilter(this.model, filter)[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get(filter: {} = {}) {
    try {
      return MultiFilter(this.model, filter);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(_id: string, replacement: IOption) {
    try {
      let temp: Array<any> = await this.get({ _id });
      if (temp.length) {
        temp[0] = Object.assign(temp[0], replacement);
        return temp[0];
      } else return 0;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(_id: string) {
    try {
      const lengthBefore = this.model.length;
      this.model = this.model.filter((item: IOption) => item._id !== _id);
      if (this.model.length === lengthBefore) return 0;
      else return 1;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async drop() {
    try {
      this.model.length = 0;
      return this.model;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
