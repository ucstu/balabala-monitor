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
  url: string;
  msg: string;
  line: number;
  column: number;
  stack: string;
};

export namespace JavaScriptError {
  export enum mainType {
    ResourceError = 1,
    JavaScriptError = 2,
    PromiseError = 3,
    VueError = 4,
  }

  export enum subType {
    ResourceError = 1001,
    JavaScriptError = 2001,
    PromiseError = 3001,
    VueError = 4001,
  }
}
