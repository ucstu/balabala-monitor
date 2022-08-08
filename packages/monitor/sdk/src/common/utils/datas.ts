import { getConfig } from "../config";

export const getAppId = (): string => {
  return getConfig().appId;
};

export const getTimeStamp = (): number => {
  return new Date().getTime();
};

export const getPageUrl = () => {
  const {
    location: { href },
  } = window;
  return href;
};

export let getUserID = () => {
  return getConfig().userId;
};

export const getBasicParams = () => {
  return {
    appId: getAppId(),
    startTime: getTimeStamp(),
    pageUrl: getPageUrl(),
    userID: getUserID(),
  };
};
