/**
 * 点击行为
 */
export class ClickBehavior {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 页面结构
   */
  html: string;
  /**
   * 内部文本
   */
  inner: string;
  /**
   * 点击位置距离页面左端距离
   */
  left: number;
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
   * 点击对象
   */
  target: string;
  /**
   * 点击位置距离页面顶端距离
   */
  top: number;
  /**
   * 用户ID
   */
  userID: string;
}
