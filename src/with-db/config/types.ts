export interface IENV {
  [key: string]: string | {};
}

export interface ISetup {
  env: string;
  dbUrl: string;
  dbName: string;
  port: number;
  hostname: string;
}
