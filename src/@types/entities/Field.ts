export interface IEquipment {
  name: string;
  price: number;
}

export interface IField {
  id: string;
  name: string;
  thumbnail: string;
  specificAddress: string;
  ward: string;
  district: string;
  province: string;
  phone: string;
  type: string;
  capacity: number;
  price: number;
  equipments: IEquipment[];
  owner: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
