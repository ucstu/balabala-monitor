export declare type ResourceIndicator = {
  appId: string;
  mainType: ResourceIndicator.mainType;
  subType: ResourceIndicator.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  duration: number;
  dns: number;
  tcp: number;
  redirect: number;
  ttfb: number;
  protocol: string;
  bodySize: number;
  headerSize: number;
  resourceSize: number;
  isCache: boolean;
};
export declare namespace ResourceIndicator {
  enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
    "_5" = 5,
    "_6" = 6,
  }
  enum subType {
    "_1001" = 1001,
    "_1002" = 1002,
    "_1003" = 1003,
    "_1004" = 1004,
    "_2001" = 2001,
    "_2002" = 2002,
    "_3001" = 3001,
    "_4001" = 4001,
    "_4002" = 4002,
    "_5001" = 5001,
    "_6001" = 6001,
  }
}
