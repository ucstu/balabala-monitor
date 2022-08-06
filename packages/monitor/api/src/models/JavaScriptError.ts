/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type JavaScriptError = {
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

export namespace JavaScriptError {
  export enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
  }

  export enum subType {
    "_1001" = 1001,
    "_2001" = 2001,
    "_3001" = 3001,
    "_4001" = 4001,
  }
}
