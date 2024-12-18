import { RDLogin, RDRegister } from "../@types/apis/RequestData";
import { User } from "../@types/entities/User";
import { callApi } from ".";
import {
  TApiProps,
  TResponseDataObj,
  TResponseErrorCommon,
} from "../@types/apis";
import END_POINT from "../constants/endpoint";

export const apiSignIn = async ({
  name = "apiSignIn",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: { email: string; password: string };
  successHandler?: TApiProps<
    RDLogin,
    TResponseDataObj<User>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDLogin,
    TResponseDataObj<User>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDLogin, TResponseDataObj<User>>({
    name,
    path: END_POINT.LOGIN,
    data: {
      body,
    },
    method: "POST",
    successHandler,
    errorHandler,
  });

  return result;
};
export const apiRegister = async ({
  name = "apiRegister",
  body,
  successHandler,
  errorHandler,
}: {
  name?: string;
  body: RDRegister["body"];
  successHandler?: TApiProps<
    RDRegister,
    TResponseDataObj<any>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDRegister,
    TResponseDataObj<any>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDRegister, TResponseDataObj<any>>({
    name,
    path: END_POINT.REGISTER,
    data: {
      body,
    },
    method: "POST",
    successHandler,
    errorHandler,
  });
  return result;
};
