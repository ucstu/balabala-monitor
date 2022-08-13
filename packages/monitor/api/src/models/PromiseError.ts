/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PromiseError = {
  appId: string;
  mainType: PromiseError.mainType;
  subType: PromiseError.subType;
  errorTime: number;
  pageUrl: string;
  userID: string;
  stack: string;
};

export namespace PromiseError {
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
