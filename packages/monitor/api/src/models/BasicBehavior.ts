/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BasicBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: BasicBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: BasicBehavior.subType;
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

export namespace BasicBehavior {
  /**
   * 行为类型
   */
  export enum mainType {
    BasicBehavior = 1,
    ClickBehavior = 2,
    PageSkipBehavior = 3,
    RoutingSkipBehavior = 4,
  }

  /**
   * 子行为类型
   */
  export enum subType {
    PV = 1001,
    UV = 1002,
    PageDwellTime = 1003,
    PageAccessDepth = 1004,
    ClickBehavior = 2001,
    PageSkipBehavior = 3001,
    RoutingSkipBehavior = 4001,
  }
}
