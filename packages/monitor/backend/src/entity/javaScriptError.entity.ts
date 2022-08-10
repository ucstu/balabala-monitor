export class JavaScriptError {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误列号
   */
  column: number;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 错误行号
   */
  line: number;
  /**
   * 错误类型
   */
  mainType: number;
  /**
   * 错误消息
   */
  msg: string;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 错误调用堆栈
   */
  stack: string;
  /**
   * 子错误类型
   */
  subType: number;
  /**
   * 文件路径
   */
  url: string;
  /**
   * 用户ID
   */
  userID: string;
}
