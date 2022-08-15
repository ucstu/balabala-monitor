/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResourceIndicator = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 指标类型
   */
  mainType: ResourceIndicator.mainType;
  /**
   * 子指标类型
   */
  subType: ResourceIndicator.subType;
  /**
   * 开始时间
   */
  startTime: number;
  /**
   * 页面路径
   */
  pageUrl: string;
  /**
   * 用户ID
   */
  userID: string;
  /**
   * 资源路径
   */
  url: string;
  /**
   * 加载耗时
   */
  duration: number;
  /**
   * DNS耗时
   */
  dns: number;
  /**
   * TCP耗时
   */
  tcp: number;
  /**
   * 重定向耗时
   */
  redirect: number;
  /**
   * 首字节时间
   */
  ttfb: number;
  /**
   * 请求协议
   */
  protocol: string;
  /**
   * 内容大小
   */
  bodySize: number;
  /**
   * 标头大小
   */
  headerSize: number;
  /**
   * 资源大小
   */
  resourceSize: number;
  /**
   * 命中缓存
   */
  isCache: boolean;
};

export namespace ResourceIndicator {
  /**
   * 指标类型
   */
  export enum mainType {
    Performance = 1,
    LoadIndicator = 2,
    DrawIndicator = 3,
    OperationIndicator = 4,
    InterfaceIndicator = 5,
    ResourceIndicator = 6,
  }

  /**
   * 子指标类型
   */
  export enum subType {
    FirstPaint = 1001,
    FirstContentfulPaint = 1002,
    LargestContentfulPaint = 1003,
    LayoutShift = 1004,
    DOMContentLoaded = 2001,
    FullLoad = 2002,
    FirstScreenLoad = 3001,
    FramesPerSecond = 4001,
    RouterLoadTime = 4002,
    InterfaceIndicator = 5001,
    ResourceIndicator = 6001,
  }
}
