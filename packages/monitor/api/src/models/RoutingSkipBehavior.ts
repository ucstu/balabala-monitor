/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RoutingSkipBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: RoutingSkipBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: RoutingSkipBehavior.subType;
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
   * 路由跳转起步位置
   */
  from: string;
  /**
   * 路由跳转目的位置
   */
  to: string;
  /**
   * 路径参数
   */
  params: string;
  /**
   * 查询参数
   */
  query: string;
};

export namespace RoutingSkipBehavior {
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
