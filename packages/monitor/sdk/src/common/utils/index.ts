import { getConfig } from "../config";

export let cacheDataBase: IDBDatabase;
export const initReportCache = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("monitorReportCache", 1);
    request.onerror = function (_event) {
      reject();
    };
    request.onsuccess = function (_event) {
      cacheDataBase = request.result;
      resolve();
    };
    request.onupgradeneeded = function (event) {
      cacheDataBase = (event.target as EventTarget & { result: IDBDatabase })
        .result;
      if (!cacheDataBase.objectStoreNames.contains("cache")) {
        cacheDataBase.createObjectStore("cache", { autoIncrement: true });
      }
      resolve();
    };
  });
};

export const getAppId = (): string => {
  return getConfig().appId;
};

export const getTimeStamp = (): number => {
  return new Date().getTime();
};

export const getPageUrl = () => {
  const {
    location: { pathname, hash },
  } = window;
  return pathname + hash;
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
