/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResourceError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: ResourceError.mainType;
  /**
   * 子错误类型
   */
  subType: ResourceError.subType;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * eg：js、css、img、audio
   */
  resourceType: string;
  /**
   * 页面结构
   */
  html: string;
  /**
   * 资源路径
   */
  path: string;
};

export namespace ResourceError {
  /**
   * 错误类型
   */
  export enum mainType {
    ResourceError = 1,
    JavaScriptError = 2,
    PromiseError = 3,
    VueError = 4,
  }

  /**
   * 子错误类型
   */
  export enum subType {
    ResourceError = 1001,
    JavaScriptError = 2001,
    PromiseError = 3001,
    VueError = 4001,
  }
}
