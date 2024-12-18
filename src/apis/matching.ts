import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import {
  RDCreateMatchingField,
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
    path: END_POINT.MATCHING,
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
    path: END_POINT.MATCHING,
    successHandler,
    errorHandler,
  });

  return result;
};

export const joinMatching = async ({
  name = "joinMatching",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDJoinMatching["body"];
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
      body,
    },
    path: END_POINT.MATCHING,
    method: "PATCH",
    successHandler,
    errorHandler,
  });

  return result;
};
