import { getAxiosInstance } from "./config";

export * from "./config";
export * from "./services";
export * from "./types";

export const setBaseURL = (baseURL: string) => {
  getAxiosInstance().defaults.baseURL = baseURL;
};
export const setBearerToken = (token: string) => {
  getAxiosInstance().defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
};
