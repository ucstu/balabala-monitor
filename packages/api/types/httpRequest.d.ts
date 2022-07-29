import { AxiosRequestConfig } from "axios";
import { Security, SwaggerResponse } from "./config";
export declare const Http: {
  getRequest(
    url: string,
    queryParams: any | undefined,
    _requestBody: undefined,
    security: Security,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  postRequest(
    url: string,
    queryParams: any | undefined,
    requestBody: any | undefined,
    security: Security,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  putRequest(
    url: string,
    queryParams: any | undefined,
    requestBody: any | undefined,
    security: Security,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  patchRequest(
    url: string,
    queryParams: any | undefined,
    requestBody: any | undefined,
    security: Security,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  deleteRequest(
    url: string,
    queryParams: any | undefined,
    requestBody: any | undefined,
    security: Security,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
};
