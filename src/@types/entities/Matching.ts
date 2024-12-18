export interface IMatching {
  date: string;
  endTime: string;
  fieldId: string;
  fieldInfo: {
    _id: string;
    name: string;
    sport: string;
    location: string;
    capacity: number;
    price: number;
    venueId: string;
  };
  matchedCount: number;
  matchedUser: Array<{ userId: string; quantity: number }>;
  max_number: number;
  message: string;
  sport: string;
  startTime: string;
  totalPrice: number;
  userid: string;
  _id: string;
}
