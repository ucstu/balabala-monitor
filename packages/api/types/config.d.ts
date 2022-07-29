import { AxiosInstance, AxiosResponse } from "axios";
declare function getAxiosInstance(security?: Security): AxiosInstance;
declare class RequestError extends Error {
  message: string;
  status?: number | undefined;
  response?: AxiosResponse<any, any> | undefined;
  constructor(
    message: string,
    status?: number | undefined,
    response?: AxiosResponse<any, any> | undefined
  );
  isApiException: boolean;
  static isRequestError(error: any): error is RequestError;
}
export declare type Security = any[] | undefined;
export interface SwaggerResponse<R> extends AxiosResponse<R> {}
export { getAxiosInstance, RequestError };
