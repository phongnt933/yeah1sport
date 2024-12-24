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

export interface RDCreateMyTeam extends RDCommon {
  body: {
    name: string;
    type: string;
    description?: string;
    members: string[];
  };
}

export interface RDEditMyTeam extends RDCommon {
  param: {
    id: string;
  };
  body: {
    name?: string;
    type?: string;
    description?: string;
    members?: string[];
  };
}

export interface RDDeleteMyTeam extends RDCommon {
  param: {
    id: string;
  };
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
    page?: number;
    record?: number;
  };
}

export interface RDCreateMatchingField extends RDCommon {
  body: {
    bookingId: string;
    quantity: number;
    message: string;
  };
}

export interface RDGetListMatching extends RDCommon {
  query?: {
    page?: number;
    record?: number;
  };
}

export interface RDJoinMatching extends RDCommon {
  param: {
    id: string;
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

export interface RDCreateRefereeOrder extends RDCommon {
  body: {
    bookingId: string;
    refereeId: string;
  };
}
export interface RDCaptureRefereeOrder extends RDCommon {
  body: {
    orderId: string;
  };
}
