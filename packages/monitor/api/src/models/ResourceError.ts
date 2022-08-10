/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResourceError = {
  appId: string;
  mainType: ResourceError.mainType;
  subType: ResourceError.subType;
  errorTime: number;
  pageUrl: string;
  userID: string;
  /**
   * eg：js、css、img、audio
   */
  resourceType: string;
  html: string;
  path: string;
};

export namespace ResourceError {
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
