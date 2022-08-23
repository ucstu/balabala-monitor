/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type InterfaceIndicator = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 指标类型
   */
  mainType: InterfaceIndicator.mainType;
  /**
   * 子指标类型
   */
  subType: InterfaceIndicator.subType;
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
   * 状态编码
   */
  statusCode: number;
  /**
   * 请求方法
   */
  method: string;
  /**
   * 接口耗时
   */
  duration: number;
  /**
   * 接口地址
   */
  url: string;
  /**
   * 接口数据
   */
  data: string;
};

export namespace InterfaceIndicator {
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
