export interface IUser {
  _id: string;
  name: string;
  age: number;
}

export interface IItem {
  name: string;
  cost: number;
  quanity: number;
}

export interface IOrder {
  _id: string;
  reference: string;
  user: string;
  items: Array<IItem>;
}
