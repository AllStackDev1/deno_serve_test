import db from "../config/db.ts";

export default class Repo {
  private model: any;
  constructor(collection: string) {
    this.model = db.getDatabase.collection(collection);
    this.insertOne = this.insertOne.bind(this);
    this.getById = this.getById.bind(this);
    this.getOne = this.getOne.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  __call(method: string, args: any) {
    console.log(`'${method}()' is missing!`);
  }

  async insertOne(doc: {}) {
    try {
      return await this.model.insertOne(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async insertMany(docs: Array<{}>) {
    try {
      return await this.model.insertMany(docs);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getById(_id: string) {
    try {
      return await this.model.findOne({ _id: { "$oid": _id } });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getOne(query: {} = {}) {
    try {
      return await this.model.findOne(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get(query: {} = {}) {
    try {
      return await this.model.find(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(_id: string, replacement: any) {
    try {
      const doc = await this.model.findOne({ _id: { "$oid": _id } });
      if (doc) {
        const { matchedCount } = await this.model.updateOne(
          { _id: { "$oid": _id } },
          { $set: replacement },
        );
        if (matchedCount) return 1;
        return -1;
      }
      return 0;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(_id: string) {
    try {
      const doc = await this.model.findOne({ _id: { "$oid": _id } });
      if (doc) {
        const deleteCount = await this.model.deleteOne(
          { _id: { "$oid": _id } },
        );
        if (deleteCount) return 1;
        return -1;
      }
      return 0;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
