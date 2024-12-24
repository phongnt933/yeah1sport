import { FIELD_TYPE } from "src/constants/field";

export interface IBooking {
  id: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  date: string;
  isMatching: boolean;
  quantity: number;
  refereeId?: string;
  message: string;
  members: Array<{ id: string; name: string }>;
  userDetails: {
    name: string;
    phone: string;
  };
  fieldDetails: {
    name: string;
    type: FIELD_TYPE;
  };
}
