/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VueError = {
  appId: string;
  mainType: VueError.mainType;
  subType: VueError.subType;
  errorTime: number;
  pageUrl: string;
  userID: string;
  stack: string;
};

export namespace VueError {
  export enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
  }

  export enum subType {
    "_1001" = 1001,
    "_2001" = 2001,
    "_3001" = 3001,
    "_4001" = 4001,
  }
}
