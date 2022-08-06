export declare type JavaScriptError = {
  appId: string;
  mainType: JavaScriptError.mainType;
  subType: JavaScriptError.subType;
  errorTime: number;
  pageUrl: string;
  userID: string;
  msg: string;
  line: number;
  column: number;
  stack: string;
};
export declare namespace JavaScriptError {
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
