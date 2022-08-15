/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ClickBehavior = {
  /**
   * 应用ID
   */
  appId: string;
  /**
   * 行为类型
   */
  mainType: ClickBehavior.mainType;
  /**
   * 子行为类型
   */
  subType: ClickBehavior.subType;
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
   * 点击位置距离页面左端距离
   */
  left: number;
  /**
   * 点击位置距离页面顶端距离
   */
  top: number;
  /**
   * 点击对象
   */
  target: string;
  /**
   * 页面结构
   */
  html: string;
  /**
   * 内部文本
   */
  inner: string;
};

export namespace ClickBehavior {
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
