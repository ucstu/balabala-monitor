export declare let cacheDataBase: IDBDatabase;
export declare const initReportCache: () => Promise<void>;
export declare const getAppId: () => string;
export declare const getTimeStamp: () => number;
export declare const getPageUrl: () => string;
export declare let getUserID: () => string;
export declare const getBasicParams: () => {
  appId: string;
  startTime: number;
  pageUrl: string;
  userID: string;
};
