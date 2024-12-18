import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import { RDCommon, RDCreateMyTeam } from "../@types/apis/RequestData";
import { ITeam } from "../@types/entities/Team";
import END_POINT from "../constants/endpoint";

export const createMyTeam = async ({
  name = "createMyTeam",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCreateMyTeam["body"];
  successHandler?: TApiProps<
    RDCreateMyTeam,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCreateMyTeam,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCreateMyTeam, TResponseDataObj<any>>({
    name,
    path: END_POINT.MY_TEAM,
    data: {
      body,
    },
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};

export const getMyTeam = async ({
  name = "getMyTeam",
  successHandler,
  errorHandler,
}: {
  name?: string;
  successHandler?: TApiProps<
    RDCommon,
    TResponseDataArr<ITeam>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCommon,
    TResponseDataArr<ITeam>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCommon, TResponseDataArr<ITeam>>({
    name,
    path: END_POINT.MY_TEAM,
    method: "GET",
    successHandler,
    errorHandler,
  });

  return result;
};

export const updateMyTeam = async ({
  name = "updateMyTeam",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDCreateMyTeam["body"];
  successHandler?: TApiProps<
    RDCreateMyTeam,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDCreateMyTeam,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDCreateMyTeam, TResponseDataObj<any>>({
    name,
    path: END_POINT.MY_TEAM,
    data: {
      body,
    },
    method: "PUT",
    successHandler,
    errorHandler,
  });

  return result;
};
