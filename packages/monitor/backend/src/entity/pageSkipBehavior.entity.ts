/**
 *页面跳转行为
 */
export class PageSkipBehavior {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 路由跳转起步位置
   */
  from: string;
  /**
   * 行为类型
   */
  mainType: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 子行为类型
   */
  subType: number;
  /**
   * 路由跳转目的位置
   */
  to: string;
  /**
   * 用户ID
   */
  userID: string;
}
