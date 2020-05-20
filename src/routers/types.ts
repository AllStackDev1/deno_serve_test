interface IMethods {
  post: string;
  get: string;
  patch: string;
  put: string;
  delete: string;
}

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export interface IEndpoint {
  route: string;
  methods: Array<keyof IMethods>;
  middlewares: PartialRecord<keyof IMethods, any[]>;
}
