/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 5
 */

export interface Account {
  /**
   *
   * 账号ID
   *
   */
  id: number;
  /**
   *
   * 昵称
   *
   */
  name: string;
  /**
   *
   * 用户名称
   *
   */
  password: string;
  /**
   *
   * 电话号码
   *
   */
  phone: string;
}

export interface Article {
  /**
   *
   * 文章分类
   *
   * {1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}
   */
  articleClass: number;
  /**
   *
   * 文章内容
   *
   */
  articleContent: string;
  /**
   *
   * 文章封面
   *
   */
  articleCover: string;
  /**
   *
   * 文章ID
   *
   */
  articleId: number;
  /**
   *
   * 文章概要
   *
   */
  articleSummary: string;
  /**
   *
   * 文章标签
   *
   */
  articleTags: string;
  /**
   *
   * 文章标题
   *
   */
  articleTitle: string;
  /**
   *
   * 文章访问量
   *
   */
  articleTraffic: number;
  /**
   *
   * 文章点赞量
   *
   */
  articlelikes: number;
  /**
   *
   * 创建时间
   *
   */
  createdAt: string;
  /**
   *
   * 发布用户ID
   *
   */
  phone: string;
  /**
   *
   * 更新时间
   *
   */
  updatedAt: string;
}

export interface BasicBehavior {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 行为类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 子行为类型
   *
   */
  subType: 1001 | 1002 | 1003 | 1004 | 2001 | 3001 | 4001;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
  /**
   *
   * 指标数值
   *
   */
  value: number;
}

export interface BasicIndicator {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 指标类型
   *
   */
  mainType: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 子指标类型
   *
   */
  subType:
    | 1001
    | 1002
    | 1003
    | 1004
    | 2001
    | 2002
    | 3001
    | 4001
    | 4002
    | 5001
    | 6001;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
  /**
   *
   * 指标数值
   *
   */
  value: number;
}

export interface ClickBehavior {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 页面结构
   *
   */
  html: string;
  /**
   *
   * 内部文本
   *
   */
  inner: string;
  /**
   *
   * 点击位置距离页面左端距离
   *
   */
  left: number;
  /**
   *
   * 行为类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 子行为类型
   *
   */
  subType:
    | 1001
    | 1002
    | 1003
    | 1004
    | 2001
    | 2002
    | 3001
    | 4001
    | 4002
    | 5001
    | 6001;
  /**
   *
   * 点击对象
   *
   */
  target: string;
  /**
   *
   * 点击位置距离页面顶端距离
   *
   */
  top: number;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface GetArticleQueryParams {
  /**
   *
   * 文章分类，{0:不限,1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}，eg：1
   */
  class: number;
  /**
   *
   * 当前页号，eg: 2>1
   */
  page?: number;
  /**
   *
   * 页面大小，eg：5
   */
  size?: number;
  /**
   *
   * 排序方式： DESC 或者 ASC
   */
  sort?: string;
}

export interface GetBehaviorsBasicbehaviorsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子行为类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父行为类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetBehaviorsBasicbehaviorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
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
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子错误类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父错误类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetErrorsJavascripterrorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetErrorsPromiseerrorsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子错误类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父错误类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetErrorsPromiseerrorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetErrorsResourceerrorsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子错误类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父错误类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetErrorsResourceerrorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetErrorsVueerrorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetPerformancesBasicindicatorsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetPerformancesBasicindicatorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetPerformancesInterfaceindicatorsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetPerformancesInterfaceindicatorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetPerformancesResourceindicatorsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface GetPerformancesResourceindicatorstatisticsQueryParams {
  /**
   *
   * 应用ID
   */
  appid: string;
  /**
   *
   * 结束时间
   */
  endtime: string;
  /**
   *
   * 起始时间
   */
  starttime: string;
  /**
   *
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
  /**
   *
   * 页面路径
   */
  pageurl?: string;
  /**
   *
   * 子指标类型
   */
  subType?: number;
  /**
   *
   * 排行前多少
   */
  top?: number;
  /**
   *
   * 父指标类型
   */
  type?: number;
  /**
   *
   * 用户ID
   */
  userid?: string;
}

export interface InterfaceIndicator {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 接口耗时
   *
   */
  duration: number;
  /**
   *
   * 指标类型
   *
   */
  mainType: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   *
   * 请求方法
   *
   */
  method: string;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 状态编码
   *
   */
  statusCode: number;
  /**
   *
   * 子指标类型
   *
   */
  subType:
    | 1001
    | 1002
    | 1003
    | 1004
    | 2001
    | 2002
    | 3001
    | 4001
    | 4002
    | 5001
    | 6001;
  /**
   *
   * 接口地址
   *
   */
  url: string;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface JavaScriptError {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 错误列号
   *
   */
  column: number;
  /**
   *
   * 错误时间
   *
   */
  errorTime: number;
  /**
   *
   * 错误行号
   *
   */
  line: number;
  /**
   *
   * 错误类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 错误消息
   *
   */
  msg: string;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 错误调用堆栈
   *
   */
  stack: string;
  /**
   *
   * 子错误类型
   *
   */
  subType: 1001 | 2001 | 3001 | 4001;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface PageSkipBehavior {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 路由跳转起步位置
   *
   */
  from: string;
  /**
   *
   * 行为类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 子行为类型
   *
   */
  subType:
    | 1001
    | 1002
    | 1003
    | 1004
    | 2001
    | 2002
    | 3001
    | 4001
    | 4002
    | 5001
    | 6001;
  /**
   *
   * 路由跳转目的位置
   *
   */
  to: string;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface PromiseError {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 错误时间
   *
   */
  errorTime: number;
  /**
   *
   * 错误类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 错误堆栈
   *
   */
  stack: string;
  /**
   *
   * 子错误类型
   *
   */
  subType: 1001 | 2001 | 3001 | 4001;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface ResourceError {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 错误时间
   *
   */
  errorTime: number;
  /**
   *
   * 页面结构
   *
   */
  html: string;
  /**
   *
   * 错误类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 资源路径
   *
   */
  path: string;
  /**
   *
   * 资源类型
   *
   * eg：js、css、img、audio
   */
  resourceType: string;
  /**
   *
   * 子错误类型
   *
   */
  subType: 1001 | 2001 | 3001 | 4001;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface ResourceIndicator {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 内容大小
   *
   */
  bodySize: number;
  /**
   *
   * DNS耗时
   *
   */
  dns: number;
  /**
   *
   * 加载耗时
   *
   */
  duration: number;
  /**
   *
   * 标头大小
   *
   */
  headerSize: number;
  /**
   *
   * 命中缓存
   *
   */
  isCache: boolean;
  /**
   *
   * 指标类型
   *
   */
  mainType: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 请求协议
   *
   */
  protocol: string;
  /**
   *
   * 重定向耗时
   *
   */
  redirect: number;
  /**
   *
   * 资源大小
   *
   */
  resourceSize: number;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 子指标类型
   *
   */
  subType:
    | 1001
    | 1002
    | 1003
    | 1004
    | 2001
    | 2002
    | 3001
    | 4001
    | 4002
    | 5001
    | 6001;
  /**
   *
   * TCP耗时
   *
   */
  tcp: number;
  /**
   *
   * 首字节时间
   *
   */
  ttfb: number;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface RoutingSkipBehavior {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 路由跳转起步位置
   *
   */
  from: string;
  /**
   *
   * 行为类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 路径参数
   *
   */
  params: string;
  /**
   *
   * 查询参数
   *
   */
  query: string;
  /**
   *
   * 开始时间
   *
   */
  startTime: number;
  /**
   *
   * 子行为类型
   *
   */
  subType:
    | 1001
    | 1002
    | 1003
    | 1004
    | 2001
    | 2002
    | 3001
    | 4001
    | 4002
    | 5001
    | 6001;
  /**
   *
   * 路由跳转目的位置
   *
   */
  to: string;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}

export interface VueError {
  /**
   *
   * 应用ID
   *
   */
  appId: string;
  /**
   *
   * 错误时间
   *
   */
  errorTime: number;
  /**
   *
   * 错误类型
   *
   */
  mainType: 1 | 2 | 3 | 4;
  /**
   *
   * 页面路径
   *
   */
  pageUrl: string;
  /**
   *
   * 错误堆栈
   *
   */
  stack: string;
  /**
   *
   * 子错误类型
   *
   */
  subType: 1001 | 2001 | 3001 | 4001;
  /**
   *
   * 用户ID
   *
   */
  userID: string;
}
