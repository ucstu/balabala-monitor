export declare type PromiseError = {
  appId: string;
  mainType: PromiseError.mainType;
  subType: PromiseError.subType;
  errorTime: number;
  pageUrl: string;
  userID: string;
  stack: string;
};
export declare namespace PromiseError {
  enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
  }
  enum subType {
    "_1001" = 1001,
    "_2001" = 2001,
    "_3001" = 3001,
    "_4001" = 4001,
  }
}
