import { IEquipment } from "src/@types/entities/Field";
import { FIELD_TYPE } from "src/constants/field";

export interface RDCommon {
  body?: {
    [key: string]: any;
  };
  query?:
    | {
        [key: string]: any;
      }
    | FormData;
  param?: {
    [key: string]: any;
  };
}

export interface RDGetUserInfo extends RDCommon {}

export interface RDLogin extends RDCommon {
  body: {
    email: string;
    password: string;
  };
}

export interface RDRegister extends RDCommon {
  body: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
}

export type TCreateTeam = {
  name: string;
  sport: string;
  description?: string;
  members: string[];
};

export interface RDCreateMyTeam extends RDCommon {
  body: TCreateTeam;
}

export interface RDFindField extends RDCommon {
  query?: {
    date: string;
    startTime: string;
    endTime: string;
    type?: FIELD_TYPE;
    ward?: string;
    district?: string;
    province?: string;
    capacity?: number;
    page?: number;
    record?: number;
  };
}

export interface RDGetAllBooking extends RDCommon {
  query?: {
    p?: number;
    r?: number;
  };
}

export interface RDCreateMatchingField extends RDCommon {
  body: {
    fieldId: string;
    startTime: string;
    endTime: string;
    date: string;
    message?: string;
    max_number: number;
    sport: string;
    totalPrice: number;
  };
}

export interface RDGetListMatching extends RDCommon {
  query?: {
    p?: number;
    r?: number;
  };
}

export interface RDJoinMatching extends RDCommon {
  body: {
    matchingId: string;
    quantity: number;
  };
}

export interface RDCreateBooking extends RDCommon {
  body: {
    fieldId: string;
    fieldPrice: number;
    totalAmount: number;
    startTime: string;
    equipments: Array<IEquipment & { quantity: number }>;
    endTime: string;
  };
}

export interface RDCaptureBooking extends RDCommon {
  body: {
    orderId: string;
  };
}
