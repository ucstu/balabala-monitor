import { getConfig } from "../config";

const getAppId = (): string => {
  return getConfig().appId;
};

const getTimeStamp = (): number => {
  return new Date().getTime();
};

const getPageUrl = () => {
  const {
    location: { pathname, hash },
  } = window;
  return pathname + hash;
};

let getUserID = () => {
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
