import { QueryToJSON } from "../helpers/index.ts";

export default class Controller {
  protected repo = {} as any;
  constructor(repo: {}) {
    this.repo = repo;
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

  async insert(
    { request, response }: { request: any; response: any },
    next: Function,
  ) {
    try {
      const body = await request.body();
      await this.repo.insert(body.value);
      response.body = { msg: "OK" };
      response.status = 201;
    } catch (error) {
      response.body = error;
    }
  }

  async getById(
    { params, response }: { params: { _id: string }; response: any },
    next: Function,
  ) {
    try {
      const result = await this.repo.getById(params._id);
      if (result) response.body = result;
      else response.body = `No record found with _id ${params._id}`;
      response.status = 200;
      return;
    } catch (error) {
      response.body = error;
    }
  }

  async getOne(
    { request, response }: { request: any; response: any },
    next: Function,
  ) {
    try {
      const query = QueryToJSON(request.url.search);
      const result = await this.repo.getOne(query);
      if (result) response.body = result;
      else response.body = "No record found";
      response.status = 200;
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
      if (result) response.body = result;
      else response.body = "No record found";
      return;
    } catch (error) {
      response.body = error;
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
      if (result) response.body = result;
      else response.body = "No record found";
      response.status = 200;
      return;
    } catch (error) {
      response.body = error;
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
      if (result) {
        response.body = `Record with id ${params._id} deleted successfully`;
      } else response.body = "No record found";
      response.status = 200;
      return;
    } catch (error) {
      response.body = error;
    }
  }

  async drop({ response }: { response: any }, next: Function) {
    try {
      const result = await this.repo.drop();
      if (!result.length) {
        response.body = {
          code: 200,
          message: "Collection dropped Successfully!",
        };
        response.status = 200;
      } else {
        throw "Unknow error!";
      }
      return;
    } catch (error) {
      response.body = error;
      response.status = 400;
    }
  }
}
