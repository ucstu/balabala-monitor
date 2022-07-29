export interface Account {
  id: number;
  name: string;
  password: string;
  phone: string;
}
export interface Article {
  articleClass: number;
  articleContent: string;
  articleCover: string;
  articleId: number;
  articleSummary: string;
  articleTags: string;
  articleTitle: string;
  articleTraffic: number;
  articlelikes: number;
  createdAt: string;
  phone: string;
  updatedAt: string;
}
export interface BasicBehavior {
  appId: string;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  startTime: number;
  subType: "1001" | "1002" | "1003" | "1004" | "2001" | "3001" | "4001";
  userID: string;
  value: number;
}
export interface BasicIndicator {
  appId: string;
  mainType: "1" | "2" | "3" | "4" | "5" | "6";
  pageUrl: string;
  startTime: number;
  subType:
    | "1001"
    | "1002"
    | "1003"
    | "1004"
    | "2001"
    | "2002"
    | "3001"
    | "4001"
    | "4002"
    | "5001"
    | "6001";
  userID: string;
  value: number;
}
export interface ClickBehavior {
  appId: string;
  html: string;
  inner: string;
  left: number;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  startTime: number;
  subType:
    | "1001"
    | "1002"
    | "1003"
    | "1004"
    | "2001"
    | "2002"
    | "3001"
    | "4001"
    | "4002"
    | "5001"
    | "6001";
  target: string;
  top: number;
  userID: string;
}
export interface GetArticleQueryParams {
  class: number;
  page?: number;
  size?: number;
  sort?: string;
}
export interface GetBehaviorsBasicbehaviorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetBehaviorsBasicbehaviorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetBehaviorsClickbehaviorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: string;
  top?: string;
  type?: string;
  userid?: string;
}
export interface GetBehaviorsPageskipbehaviorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: string;
  top?: string;
  type?: string;
  userid?: string;
}
export interface GetBehaviorsRoutingskipbehaviorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: string;
  top?: string;
  type?: string;
  userid?: string;
}
export interface GetErrorsJavascripterrorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetErrorsJavascripterrorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetErrorsPromiseerrorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetErrorsPromiseerrorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetErrorsResourceerrorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetErrorsResourceerrorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetErrorsVueerrorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetPerformancesBasicindicatorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetPerformancesBasicindicatorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetPerformancesInterfaceindicatorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetPerformancesInterfaceindicatorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetPerformancesResourceindicatorsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface GetPerformancesResourceindicatorstatisticsQueryParams {
  appid: string;
  endtime: string;
  starttime: string;
  granularity?: string;
  pageurl?: string;
  subType?: number;
  top?: number;
  type?: number;
  userid?: string;
}
export interface InterfaceIndicator {
  appId: string;
  duration: number;
  mainType: "1" | "2" | "3" | "4" | "5" | "6";
  method: string;
  pageUrl: string;
  startTime: number;
  statusCode: number;
  subType:
    | "1001"
    | "1002"
    | "1003"
    | "1004"
    | "2001"
    | "2002"
    | "3001"
    | "4001"
    | "4002"
    | "5001"
    | "6001";
  url: string;
  userID: string;
}
export interface JavaScriptError {
  appId: string;
  column: number;
  errorTime: number;
  line: number;
  mainType: "1" | "2" | "3" | "4";
  msg: string;
  pageUrl: string;
  stack: string;
  subType: "1001" | "2001" | "3001" | "4001";
  userID: string;
}
export interface PageSkipBehavior {
  appId: string;
  from: string;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  startTime: number;
  subType:
    | "1001"
    | "1002"
    | "1003"
    | "1004"
    | "2001"
    | "2002"
    | "3001"
    | "4001"
    | "4002"
    | "5001"
    | "6001";
  to: string;
  userID: string;
}
export interface PromiseError {
  appId: string;
  errorTime: number;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  stack: string;
  subType: "1001" | "2001" | "3001" | "4001";
  userID: string;
}
export interface ResourceError {
  appId: string;
  errorTime: number;
  html: string;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  path: string;
  resourceType: string;
  subType: "1001" | "2001" | "3001" | "4001";
  userID: string;
}
export interface ResourceIndicator {
  appId: string;
  bodySize: number;
  dns: number;
  duration: number;
  headerSize: number;
  isCache: boolean;
  mainType: "1" | "2" | "3" | "4" | "5" | "6";
  pageUrl: string;
  protocol: string;
  redirect: number;
  resourceSize: number;
  startTime: number;
  subType:
    | "1001"
    | "1002"
    | "1003"
    | "1004"
    | "2001"
    | "2002"
    | "3001"
    | "4001"
    | "4002"
    | "5001"
    | "6001";
  tcp: number;
  ttfb: number;
  userID: string;
}
export interface RoutingSkipBehavior {
  appId: string;
  from: string;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  params: string;
  query: string;
  startTime: number;
  subType:
    | "1001"
    | "1002"
    | "1003"
    | "1004"
    | "2001"
    | "2002"
    | "3001"
    | "4001"
    | "4002"
    | "5001"
    | "6001";
  to: string;
  userID: string;
}
export interface VueError {
  appId: string;
  errorTime: number;
  mainType: "1" | "2" | "3" | "4";
  pageUrl: string;
  stack: string;
  subType: "1001" | "2001" | "3001" | "4001";
  userID: string;
}
