/**
 *接口指标
 */
export class InterfaceIndicator {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 接口耗时
   */
  duration: number;
  /**
   * 指标类型
   */
  mainType: number;
  /**
   * 请求方法
   */
  method: string;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 状态编码
   */
  statusCode: number;
  /**
   * 子指标类型
   */
  subType: number;
  /**
   * 接口地址
   */
  url: string;
  /**
   * 用户ID
   */
  userID: string;
}
