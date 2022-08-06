export declare type ResourceError = {
  appId: string;
  mainType: ResourceError.mainType;
  subType: ResourceError.subType;
  errorTime: number;
  pageUrl: string;
  userID: string;
  resourceType: string;
  html: string;
  path: string;
};
export declare namespace ResourceError {
  enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
  }
  enum subType {
    "_1001" = 1001,
    "_2001" = 2001,
    "_3001" = 3001,
    "_4001" = 4001,
  }
}
