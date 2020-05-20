import { IOrder } from "./types.ts";

let order: Array<IOrder> = [
  {
    _id: "1",
    reference: "cfredksn12",
    user: "1",
    items: [
      {
        name: "Milk",
        cost: 200,
        quanity: 2,
      },
    ],
  },
];

export default order;
