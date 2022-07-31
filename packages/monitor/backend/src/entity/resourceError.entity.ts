/**
 *资源错误
 */
export class ResourceError {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 错误时间
   */
  errorTime: number;
  /**
   * 页面结构
   */
  html: string;
  /**
   * 错误类型
   */
  mainType: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 资源路径
   */
  path: string;
  /**
   * 资源类型，eg：js、css、img、audio
   */
  resourceType: string;
  /**
   * 子错误类型
   */
  subType: number;
  /**
   * 用户ID
   */
  userID: string;
}
