/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ClickBehavior = {
  appId: string;
  mainType: ClickBehavior.mainType;
  subType: ClickBehavior.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  left: number;
  top: number;
  target: string;
  html: string;
  inner: string;
};

export namespace ClickBehavior {
  export enum mainType {
    BasicBehavior = 1,
    ClickBehavior = 2,
    PageSkipBehavior = 3,
    RoutingSkipBehavior = 4,
  }

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
