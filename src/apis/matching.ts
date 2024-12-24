import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import {
  RDCaptureRefereeOrder,
  RDCreateMatchingField,
  RDCreateRefereeOrder,
  RDGetListMatching,
  RDJoinMatching,
} from "../@types/apis/RequestData";
import END_POINT from "../constants/endpoint";

export const createMatching = async ({
  name = "createMatching",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCreateMatchingField["body"];
  successHandler?: TApiProps<
    RDCreateMatchingField,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCreateMatchingField,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCreateMatchingField, TResponseDataObj<any>>({
    name,
    data: {
      body,
    },
    path: END_POINT.CREATE_MATCHING,
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};

export const getListMatching = async ({
  name = "getListMatching",
  query,
  successHandler,
  errorHandler,
}: {
  name?: string;
  query?: RDGetListMatching["query"];
  successHandler?: TApiProps<
    RDGetListMatching,
    TResponseDataArr<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDGetListMatching,
    TResponseDataArr<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDGetListMatching, TResponseDataArr<any>>({
    name,
    data: {
      query,
    },
    path: END_POINT.FIND_MATCHING,
    successHandler,
    errorHandler,
  });

  return result;
};

export const joinMatching = async ({
  name = "joinMatching",
  param,
  successHandler,
  errorHandler,
}: {
  name?: string;
  param: RDJoinMatching["param"];
  successHandler?: TApiProps<
    RDJoinMatching,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDJoinMatching,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDJoinMatching, TResponseDataObj<any>>({
    name,
    data: {
      param,
    },
    path: END_POINT.JOIN_MATCHING,
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};

export const outMatching = async ({
  name = "outMatching",
  param,
  successHandler,
  errorHandler,
}: {
  name?: string;
  param: RDJoinMatching["param"];
  successHandler?: TApiProps<
    RDJoinMatching,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDJoinMatching,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDJoinMatching, TResponseDataObj<any>>({
    name,
    data: {
      param,
    },
    path: END_POINT.JOIN_MATCHING,
    method: "PUT",
    successHandler,
    errorHandler,
  });

  return result;
};

export const getListReferee = async ({
  name = "getListReferee",
  query,
  successHandler,
  errorHandler,
}: {
  name?: string;
  query?: RDGetListMatching["query"];
  successHandler?: TApiProps<
    RDGetListMatching,
    TResponseDataArr<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDGetListMatching,
    TResponseDataArr<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDGetListMatching, TResponseDataArr<any>>({
    name,
    data: {
      query,
    },
    path: END_POINT.REFEREE,
    successHandler,
    errorHandler,
  });

  return result;
};

export const createRefereeOrder = async ({
  name = "getListReferee",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCreateRefereeOrder["body"];
  successHandler?: TApiProps<
    RDCreateRefereeOrder,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCreateRefereeOrder,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCreateRefereeOrder, TResponseDataObj<any>>({
    name,
    data: {
      body,
    },
    method: "POST",
    path: END_POINT.REFEREE,
    successHandler,
    errorHandler,
  });

  return result;
};

export const captureRefereeOrder = async ({
  name = "captureRefereeOrder",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCaptureRefereeOrder["body"];
  successHandler?: TApiProps<
    RDCaptureRefereeOrder,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCaptureRefereeOrder,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCaptureRefereeOrder, TResponseDataObj<any>>({
    name,
    data: {
      body,
    },
    path: END_POINT.CAPTURE_REFEREE,
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};
