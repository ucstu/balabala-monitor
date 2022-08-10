/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type InterfaceIndicator = {
  appId: string;
  mainType: InterfaceIndicator.mainType;
  subType: InterfaceIndicator.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  statusCode: number;
  method: string;
  duration: number;
  url: string;
};

export namespace InterfaceIndicator {
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
