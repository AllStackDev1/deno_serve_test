import { QueryToJSON } from "../helpers/index.ts";
import { IOption } from "./types.ts";

export default class Controller {
  protected repo: IOption = {};
  protected name: string = "";
  constructor(repo: IOption, name: string) {
    this.repo = repo;
    this.name = name;
    this.insertOne = this.insertOne.bind(this);
    this.insertMany = this.insertMany.bind(this);
    this.getById = this.getById.bind(this);
    this.getOne = this.getOne.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  __call(method: string, args: any) {
    console.log(`'${method}()' is missing!`);
  }

  async insertOne(
    { request, response }: { request: any; response: any },
    next: Function,
  ) {
    try {
      const body = await request.body();
      const doc: IOption = body.value;
      const insertId = await this.repo.insertOne(doc);
      if (insertId) {
        response.body = {
          success: true,
          message: `${this.name} created successfully`,
          insertId,
        };
        response.status = 201;
      } else {
        response.body = {
          success: false,
          message: "Unexpected server error",
        };
        response.status = 500;
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 500;
    }
  }

  async insertMany(
    { request, response }: { request: any; response: any },
    next: Function,
  ) {
    try {
      const body = await request.body();
      const docs: Array<IOption> = body.value;
      const insertIds = await this.repo.insertOne(docs);
      if (insertIds.length) {
        response.body = {
          success: true,
          message: `${this.name} created successfully`,
          insertIds,
        };
        response.status = 201;
      } else {
        response.body = {
          success: false,
          message: "Unexpected server error",
        };
        response.status = 500;
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 500;
    }
  }

  async getById(
    { params, response }: { params: { _id: string }; response: any },
    next: Function,
  ) {
    try {
      const result = await this.repo.getById(params._id);
      if (result) {
        response.body = { success: true, result };
        response.status = 200;
      } else {
        response.body = {
          success: false,
          message:
            `No ${this.name.toLowerCase()} record found with _id ${params._id}`,
        };
        response.status = 404;
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 500;
    }
  }

  async getOne(
    { request, response }: { request: any; response: any },
    next: Function,
  ) {
    try {
      const query = QueryToJSON(request.url.search);
      const result = await this.repo.getOne(query);
      if (result) {
        response.body = { success: true, result };
        response.status = 200;
      } else {
        response.body = {
          success: false,
          message: `No ${this.name.toLowerCase()} record found`,
        };
        response.status = 404;
      }
      return;
    } catch (error) {
      response.body = error;
    }
  }

  async get(
    { request, response }: { request: any; response: any },
    next: Function,
  ) {
    try {
      const query = QueryToJSON(request.url.search);
      const result = await this.repo.get(query);
      if (result.length) {
        response.body = { success: true, result };
        response.status = 200;
      } else {
        response.body = {
          success: false,
          message: `No ${this.name.toLowerCase()} record found`,
        };
        response.status = 404;
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 500;
    }
  }

  async update(
    { request, response, params }: {
      request: any;
      response: any;
      params: { _id: string };
    },
    next: Function,
  ) {
    try {
      const body = await request.body();
      const result = await this.repo.update(params._id, body.value);
      if (result === 1) {
        response.body = {
          success: true,
          result,
          message: `${this.name} with id ${params._id} updated successfully`,
        };
        response.status = 204;
      } else if (!result) {
        response.body = {
          success: false,
          message: `No ${this.name.toLowerCase()} record found`,
        };
        response.status = 404;
      } else {
        response.body = {
          success: false,
          message: `Unable to update ${this.name.toLowerCase()}`,
        };
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 500;
    }
  }

  async delete(
    { response, params }: {
      response: any;
      params: { _id: string };
    },
    next: Function,
  ) {
    try {
      const result = await this.repo.delete(params._id);
      if (result === 1) {
        response.body = {
          success: true,
          message: `${this.name} with id ${params._id} deleted successfully`,
        };
        response.status = 204;
      } else if (!result) {
        response.body = {
          success: false,
          message: `No ${this.name.toLowerCase()} record found`,
        };
        response.status = 404;
      } else {
        response.body = {
          success: false,
          message: `Unable to delete ${this.name.toLowerCase()}`,
        };
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 500;
    }
  }
}
