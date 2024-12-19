import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import {
  RDCommon,
  RDCreateMyTeam,
  RDDeleteMyTeam,
  RDEditMyTeam,
} from "../@types/apis/RequestData";
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
    path: END_POINT.CREATE_TEAM,
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
    path: END_POINT.GET_LIST_TEAM,
    method: "GET",
    successHandler,
    errorHandler,
  });

  return result;
};

export const updateMyTeam = async ({
  name = "updateMyTeam",
  param,
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  param: RDEditMyTeam["param"];
  body: RDEditMyTeam["body"];
  successHandler?: TApiProps<
    RDEditMyTeam,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDEditMyTeam,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDEditMyTeam, TResponseDataObj<any>>({
    name,
    path: END_POINT.EDIT_TEAM,
    data: {
      body,
      param,
    },
    method: "PUT",
    successHandler,
    errorHandler,
  });

  return result;
};

export const deleteMyTeam = async ({
  name = "deleteMyTeam",
  param,
  successHandler,
  errorHandler,
}: {
  name?: string;
  param: RDDeleteMyTeam["param"];
  successHandler?: TApiProps<
    RDEditMyTeam,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDDeleteMyTeam,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDDeleteMyTeam, TResponseDataObj<any>>({
    name,
    path: END_POINT.EDIT_TEAM,
    data: {
      param,
    },
    method: "DELETE",
    successHandler,
    errorHandler,
  });

  return result;
};
