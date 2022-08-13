/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResourceIndicator = {
  appId: string;
  mainType: ResourceIndicator.mainType;
  subType: ResourceIndicator.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  url: string;
  duration: number;
  dns: number;
  tcp: number;
  redirect: number;
  ttfb: number;
  protocol: string;
  bodySize: number;
  headerSize: number;
  resourceSize: number;
  isCache: boolean;
};

export namespace ResourceIndicator {
  export enum mainType {
    Performance = 1,
    LoadIndicator = 2,
    DrawIndicator = 3,
    OperationIndicator = 4,
    InterfaceIndicator = 5,
    ResourceIndicator = 6,
  }

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
