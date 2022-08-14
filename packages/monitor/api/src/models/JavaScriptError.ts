/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type JavaScriptError = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误类型
   */
  mainType: JavaScriptError.mainType;
  /**
   * 子错误类型
   */
  subType: JavaScriptError.subType;
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
   * 文件路径
   */
  url: string;
  /**
   * 错误消息
   */
  msg: string;
  /**
   * 错误行号
   */
  line: number;
  /**
   * 错误列号
   */
  column: number;
  /**
   * 错误调用堆栈
   */
  stack: string;
};

export namespace JavaScriptError {
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
