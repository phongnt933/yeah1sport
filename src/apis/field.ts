import { callApi } from ".";
import {
  TApiProps,
  TResponseDataArr,
  TResponseErrorCommon,
} from "../@types/apis";
import { RDFindField } from "../@types/apis/RequestData";
import { IField } from "../@types/entities/Field";
import END_POINT from "../constants/endpoint";

export const findField = async ({
  name = "findField",
  query,
  successHandler,
  errorHandler,
}: {
  name?: string;
  query: RDFindField["query"];
  successHandler?: TApiProps<
    RDFindField,
    TResponseDataArr<IField>,
    any
  >["successHandler"];
  errorHandler?: TApiProps<
    RDFindField,
    TResponseDataArr<IField>,
    TResponseErrorCommon<undefined>
  >["errorHandler"];
}) => {
  const result = await callApi<RDFindField, TResponseDataArr<IField>>({
    name,
    data: {
      query,
    },
    path: END_POINT.FIND_FIELD,
    method: "GET",
    successHandler,
    errorHandler,
  });

  return result;
};
