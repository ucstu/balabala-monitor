export declare type RoutingSkipBehavior = {
  appId: string;
  mainType: RoutingSkipBehavior.mainType;
  subType: RoutingSkipBehavior.subType;
  startTime: number;
  pageUrl: string;
  userID: string;
  from: string;
  to: string;
  params: string;
  query: string;
};
export declare namespace RoutingSkipBehavior {
  enum mainType {
    "_1" = 1,
    "_2" = 2,
    "_3" = 3,
    "_4" = 4,
  }
  enum subType {
    "_1001" = 1001,
    "_1002" = 1002,
    "_1003" = 1003,
    "_1004" = 1004,
    "_2001" = 2001,
    "_2002" = 2002,
    "_3001" = 3001,
    "_4001" = 4001,
    "_4002" = 4002,
    "_5001" = 5001,
    "_6001" = 6001,
  }
}
