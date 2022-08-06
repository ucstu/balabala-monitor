export declare type BasicBehavior = {
  appId: string;
  mainType: BasicBehavior.mainType;
  subType: BasicBehavior.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  value: number;
};
export declare namespace BasicBehavior {
  enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
  }
  enum subType {
    "_1001" = 1001,
    "_1002" = 1002,
    "_1003" = 1003,
    "_1004" = 1004,
    "_2001" = 2001,
    "_3001" = 3001,
    "_4001" = 4001,
  }
}
