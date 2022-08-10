/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PageSkipBehavior = {
  appId: string;
  mainType: PageSkipBehavior.mainType;
  subType: PageSkipBehavior.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  from: string;
  to: string;
};

export namespace PageSkipBehavior {
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
