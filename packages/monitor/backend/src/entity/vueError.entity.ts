/**
 * Vue错误
 */
export class VueError {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 错误类型
   */
  mainType: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 错误堆栈
   */
  stack: string;
  /**
   * 子错误类型
   */
  subType: number;
  /**
   * 用户ID
   */
  userID: string;
}
