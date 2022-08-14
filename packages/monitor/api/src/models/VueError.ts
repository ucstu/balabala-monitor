/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VueError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: VueError.mainType;
  /**
   * 子错误类型
   */
  subType: VueError.subType;
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
   * 错误堆栈
   */
  stack: string;
};

export namespace VueError {
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
