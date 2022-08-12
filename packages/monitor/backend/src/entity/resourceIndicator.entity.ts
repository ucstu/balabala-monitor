export class ResourceIndicator {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 内容大小
   */
  bodySize: number;
  /**
   * DNS耗时
   */
  dns: number;
  /**
   * 加载耗时
   */
  duration: number;
  /**
   * 标头大小
   */
  headerSize: number;
  /**
   * 命中缓存
   */
  isCache: boolean;
  /**
   * 指标类型
   */
  mainType: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 请求协议
   */
  protocol: string;
  /**
   * 重定向耗时
   */
  redirect: number;
  /**
   * 资源大小
   */
  resourceSize: number;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 子指标类型
   */
  subType: number;
  /**
   * TCP耗时
   */
  tcp: number;
  /**
   * 首字节时间
   */
  ttfb: number;
  /**
   * 资源路径
   */
  url: string;
  /**
   * 用户ID
   */
  userID: string;
}
