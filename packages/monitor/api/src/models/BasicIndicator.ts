/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BasicIndicator = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 指标类型
   */
  mainType: BasicIndicator.mainType;
  /**
   * 子指标类型
   */
  subType: BasicIndicator.subType;
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
   * 指标数值
   */
  value: number;
};

export namespace BasicIndicator {
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
