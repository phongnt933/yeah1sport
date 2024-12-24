export interface IMatching {
  totalAmount: number;
  equipments: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  date: string;
  startTime: string;
  endTime: string;
  id: string;
  isMatching: true;
  quantity: number;
  members: Array<string>;
  userDetails: {
    name: string;
    phone: string;
    id: string;
  };
  field: {
    name: string;
    specificAddress: string;
    ward: string;
    district: string;
    province: string;
    type: string;
  };
}
