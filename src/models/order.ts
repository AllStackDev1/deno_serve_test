interface IItem {
  name: string;
  cost: number;
  quanity: number;
}

interface IOrder {
  _id: string;
  reference: string;
  user: string;
  items: Array<IItem>;
}

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
