import { IBooking } from "src/@types/entities/Booking";
import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import {
  RDCaptureBooking,
  RDCreateBooking,
  RDGetAllBooking,
} from "../@types/apis/RequestData";
import END_POINT from "../constants/endpoint";

export const getAllBooking = async ({
  name = "getAllBooking",
  query,
  successHandler,
  errorHandler,
}: {
  name?: string;
  query?: RDGetAllBooking["query"];
  successHandler?: TApiProps<
    RDGetAllBooking,
    TResponseDataArr<IBooking>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDGetAllBooking,
    TResponseDataArr<IBooking>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDGetAllBooking, TResponseDataArr<IBooking>>({
    name,
    path: END_POINT.GET_LIST_BOOKING,
    data: {
      query,
    },
    successHandler,
    errorHandler,
  });

  return result;
};

export const createBooking = async ({
  name = "createBooking",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCreateBooking["body"];
  successHandler?: TApiProps<
    RDCreateBooking,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCreateBooking,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCreateBooking, TResponseDataObj<any>>({
    name,
    data: {
      body,
    },
    path: END_POINT.CREATE_BOOKING,
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};

export const captureBooking = async ({
  name = "captureBooking",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCaptureBooking["body"];
  successHandler?: TApiProps<
    RDCaptureBooking,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCaptureBooking,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCaptureBooking, TResponseDataObj<any>>({
    name,
    data: {
      body,
    },
    path: END_POINT.CAPTURE_BOOKING,
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};
