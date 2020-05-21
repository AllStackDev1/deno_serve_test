import { MongoClient } from "../deps.ts";
import setup from "./setup.ts";

class Database {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }

  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

const db = new Database(setup.dbName, setup.dbUrl);
db.connect();

export default db;
