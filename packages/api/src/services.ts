/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 5
 */

import { AxiosRequestConfig } from "axios";
import { SwaggerResponse } from "./config";
import { Http } from "./httpRequest";
import {
  GetArticleQueryParams,
  GetPerformancesBasicindicatorsQueryParams,
  GetPerformancesInterfaceindicatorsQueryParams,
  GetPerformancesResourceindicatorsQueryParams,
  GetErrorsResourceerrorsQueryParams,
  GetErrorsJavascripterrorsQueryParams,
  GetErrorsPromiseerrorsQueryParams,
  GetErrorsVueerrorsQueryParams,
  GetBehaviorsBasicbehaviorsQueryParams,
  GetBehaviorsClickbehaviorsQueryParams,
  GetBehaviorsPageskipbehaviorsQueryParams,
  GetBehaviorsRoutingskipbehaviorsQueryParams,
  GetPerformancesBasicindicatorstatisticsQueryParams,
  GetPerformancesInterfaceindicatorstatisticsQueryParams,
  GetPerformancesResourceindicatorstatisticsQueryParams,
  GetErrorsResourceerrorstatisticsQueryParams,
  GetErrorsJavascripterrorstatisticsQueryParams,
  GetErrorsPromiseerrorstatisticsQueryParams,
  GetErrorsVueerrorstatisticsQueryParams,
  GetBehaviorsBasicbehaviorstatisticsQueryParams,
  RoutingSkipBehavior,
  PageSkipBehavior,
  ClickBehavior,
  BasicBehavior,
  VueError,
  PromiseError,
  JavaScriptError,
  ResourceError,
  ResourceIndicator,
  InterfaceIndicator,
  BasicIndicator,
  Article,
  Account,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(
  config?: AxiosRequestConfig,
  configOverride?: AxiosRequestConfig
): AxiosRequestConfig {
  return {
    ...config,
    ...configOverride,
    headers: {
      ...config?.headers,
      ...configOverride?.headers,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function template(path: string, obj: { [x: string]: any } = {}) {
  Object.keys(obj).forEach((key) => {
    const re = new RegExp(`{${key}}`, "i");
    path = path.replace(re, obj[key]);
  });

  return path;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToForm(requestBody: object) {
  const formData = new FormData();

  Object.entries(requestBody).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  return formData;
}

/**
 *
 * 删除文章
 */
export const deleteArticleArticleId = (
  /**
   *
   * 文章ID，eg：b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5
   */
  articleId: string,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    data: Article;
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.deleteRequest(
    template(deleteArticleArticleId.key, { articleId }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
deleteArticleArticleId.key = "/article/{articleId}";

/**
 *
 * 查询所有文章
 */
export const getArticle = (
  queryParams: GetArticleQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     */
    data: {
      /**
       *
       * 文章信息列表
       *
       */
      articleInfos: Article[];
      /**
       *
       * 数据总数
       *
       */
      totalCount: number;
    };
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getArticle.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getArticle.key = "/article";

/**
 *
 * 查询文章
 */
export const getArticleArticleId = (
  /**
   *
   * 文章ID，eg：b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5
   */
  articleId: string,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    data: Article;
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    template(getArticleArticleId.key, { articleId }),
    undefined,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getArticleArticleId.key = "/article/{articleId}";

/**
 *
 * 基础行为查询
 */
export const getBehaviorsBasicbehaviors = (
  queryParams: GetBehaviorsBasicbehaviorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 基础行为列表
     */
    data: BasicBehavior[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getBehaviorsBasicbehaviors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getBehaviorsBasicbehaviors.key = "/behaviors/basicbehaviors";

/**
 *
 * 基础行为统计
 */
export const getBehaviorsBasicbehaviorstatistics = (
  queryParams: GetBehaviorsBasicbehaviorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 基础行为统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getBehaviorsBasicbehaviorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getBehaviorsBasicbehaviorstatistics.key = "/behaviors/basicbehaviorstatistics";

/**
 *
 * 点击行为查询
 */
export const getBehaviorsClickbehaviors = (
  queryParams: GetBehaviorsClickbehaviorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 点击行为列表
     */
    data: ClickBehavior[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getBehaviorsClickbehaviors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getBehaviorsClickbehaviors.key = "/behaviors/clickbehaviors";

/**
 *
 * 页面跳转行为查询
 */
export const getBehaviorsPageskipbehaviors = (
  queryParams: GetBehaviorsPageskipbehaviorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 页面跳转行为列表
     */
    data: PageSkipBehavior[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getBehaviorsPageskipbehaviors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getBehaviorsPageskipbehaviors.key = "/behaviors/pageskipbehaviors";

/**
 *
 * 路由跳转行为查询
 */
export const getBehaviorsRoutingskipbehaviors = (
  queryParams: GetBehaviorsRoutingskipbehaviorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 路由跳转行为列表
     */
    data: RoutingSkipBehavior[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getBehaviorsRoutingskipbehaviors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getBehaviorsRoutingskipbehaviors.key = "/behaviors/routingskipbehaviors";

/**
 *
 * JavaScript错误查询
 */
export const getErrorsJavascripterrors = (
  queryParams: GetErrorsJavascripterrorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * JavaScript错误列表
     */
    data: JavaScriptError[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsJavascripterrors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsJavascripterrors.key = "/errors/javascripterrors";

/**
 *
 * JavaScript错误统计
 */
export const getErrorsJavascripterrorstatistics = (
  queryParams: GetErrorsJavascripterrorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * JS错误统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsJavascripterrorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsJavascripterrorstatistics.key = "/errors/javascripterrorstatistics";

/**
 *
 * Promise错误查询
 */
export const getErrorsPromiseerrors = (
  queryParams: GetErrorsPromiseerrorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * Promise错误列表
     */
    data: PromiseError[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsPromiseerrors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsPromiseerrors.key = "/errors/promiseerrors";

/**
 *
 * Promise错误统计
 */
export const getErrorsPromiseerrorstatistics = (
  queryParams: GetErrorsPromiseerrorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * Promise错误统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsPromiseerrorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsPromiseerrorstatistics.key = "/errors/promiseerrorstatistics";

/**
 *
 * 资源错误查询
 */
export const getErrorsResourceerrors = (
  queryParams: GetErrorsResourceerrorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 资源错误列表
     */
    data: ResourceError[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsResourceerrors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsResourceerrors.key = "/errors/resourceerrors";

/**
 *
 * 资源错误统计
 */
export const getErrorsResourceerrorstatistics = (
  queryParams: GetErrorsResourceerrorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 资源错误统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsResourceerrorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsResourceerrorstatistics.key = "/errors/resourceerrorstatistics";

/**
 *
 * Vue错误查询
 */
export const getErrorsVueerrors = (
  queryParams: GetErrorsVueerrorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * Vue错误列表
     */
    data: VueError[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsVueerrors.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsVueerrors.key = "/errors/vueerrors";

/**
 *
 * Vue错误统计
 */
export const getErrorsVueerrorstatistics = (
  queryParams: GetErrorsVueerrorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * Vue错误统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getErrorsVueerrorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getErrorsVueerrorstatistics.key = "/errors/vueerrorstatistics";

/**
 *
 * 基础指标查询
 */
export const getPerformancesBasicindicators = (
  queryParams: GetPerformancesBasicindicatorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 基础指标列表
     */
    data: BasicIndicator[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getPerformancesBasicindicators.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getPerformancesBasicindicators.key = "/performances/basicindicators";

/**
 *
 * 基础指标统计
 */
export const getPerformancesBasicindicatorstatistics = (
  queryParams: GetPerformancesBasicindicatorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 基础指标统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getPerformancesBasicindicatorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getPerformancesBasicindicatorstatistics.key =
  "/performances/basicindicatorstatistics";

/**
 *
 * 接口指标查询
 */
export const getPerformancesInterfaceindicators = (
  queryParams: GetPerformancesInterfaceindicatorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 接口指标列表
     */
    data: InterfaceIndicator[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getPerformancesInterfaceindicators.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getPerformancesInterfaceindicators.key = "/performances/interfaceindicators";

/**
 *
 * 接口指标统计
 */
export const getPerformancesInterfaceindicatorstatistics = (
  queryParams: GetPerformancesInterfaceindicatorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 接口指标统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getPerformancesInterfaceindicatorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getPerformancesInterfaceindicatorstatistics.key =
  "/performances/interfaceindicatorstatistics";

/**
 *
 * 资源指标查询
 */
export const getPerformancesResourceindicators = (
  queryParams: GetPerformancesResourceindicatorsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 资源指标列表
     */
    data: ResourceIndicator[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getPerformancesResourceindicators.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getPerformancesResourceindicators.key = "/performances/resourceindicators";

/**
 *
 * 资源指标统计
 */
export const getPerformancesResourceindicatorstatistics = (
  queryParams: GetPerformancesResourceindicatorstatisticsQueryParams,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 资源指标统计列表
     */
    data: {
      /**
       *
       * 统计总数
       *
       */
      count: number;
      /**
       *
       * 日期时间
       *
       */
      datetime: string;
    }[];
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.getRequest(
    getPerformancesResourceindicatorstatistics.key,
    queryParams,
    undefined,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
getPerformancesResourceindicatorstatistics.key =
  "/performances/resourceindicatorstatistics";

/**
 *
 * 注册账号
 */
export const postAccounts = (
  requestBody: {
    /**
     *
     * 昵称
     *
     * 昵称可重复
     */
    name: string;
    /**
     *
     * 用户密码
     *
     */
    password: string;
    /**
     *
     * 手机号码
     *
     * 手机号码（登录用手机号，别用重复号码注册哈）
     */
    phone: string;
  },
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postAccounts.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postAccounts.key = "/accounts";

/**
 *
 * 登录账号
 */
export const postAccountsLogin = (
  requestBody: {
    /**
     *
     * 用户密码
     *
     */
    password: string;
    /**
     *
     * 手机号
     *
     * 手机号
     */
    phone: string;
  },
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    /**
     *
     * 数据主体
     *
     * 账号信息
     */
    data: Account;
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.postRequest(
    postAccountsLogin.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postAccountsLogin.key = "/accounts/login";

/**
 *
 * 新增文章
 */
export const postArticle = (
  requestBody: {
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
  },
  headerParams?: { token: string },
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postArticle.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(
      {
        headers: {
          ..._CONSTANT1,
          ...headerParams,
        },
      },
      configOverride
    )
  );
};

/** Key is end point string without base url */
postArticle.key = "/article";

/**
 *
 * 基础行为上传
 */
export const postBehaviorsBasicbehaviors = (
  requestBody: BasicBehavior,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postBehaviorsBasicbehaviors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postBehaviorsBasicbehaviors.key = "/behaviors/basicbehaviors";

/**
 *
 * 点击行为上传
 */
export const postBehaviorsClickbehaviors = (
  requestBody: ClickBehavior,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postBehaviorsClickbehaviors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postBehaviorsClickbehaviors.key = "/behaviors/clickbehaviors";

/**
 *
 * 页面跳转行为上传
 */
export const postBehaviorsPageskipbehaviors = (
  requestBody: PageSkipBehavior,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postBehaviorsPageskipbehaviors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postBehaviorsPageskipbehaviors.key = "/behaviors/pageskipbehaviors";

/**
 *
 * 路由跳转行为上传
 */
export const postBehaviorsRoutingskipbehaviors = (
  requestBody: RoutingSkipBehavior,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postBehaviorsRoutingskipbehaviors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postBehaviorsRoutingskipbehaviors.key = "/behaviors/routingskipbehaviors";

/**
 *
 * JavaScript错误上传
 */
export const postErrorsJavascripterrors = (
  requestBody: JavaScriptError,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postErrorsJavascripterrors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postErrorsJavascripterrors.key = "/errors/javascripterrors";

/**
 *
 * Promise错误上传
 */
export const postErrorsPromiseerrors = (
  requestBody: PromiseError,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postErrorsPromiseerrors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postErrorsPromiseerrors.key = "/errors/promiseerrors";

/**
 *
 * 资源错误上传
 */
export const postErrorsResourceerrors = (
  requestBody: ResourceError,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postErrorsResourceerrors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postErrorsResourceerrors.key = "/errors/resourceerrors";

/**
 *
 * Vue错误上传
 */
export const postErrorsVueerrors = (
  requestBody: VueError,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postErrorsVueerrors.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postErrorsVueerrors.key = "/errors/vueerrors";

/**
 *
 * 上传图片
 */
export const postImages = (
  requestBody: {
    /**
     *
     * 文件名称，包括后缀名 app,pen
     * @example
     *   打字比赛.png
     */
    filename: string;
    /**
     *
     * 图片，base64字符串  去掉头信息的base64信息,不要    "data:image/jpeg;base64,"
     * @example
     *   iVBORw0KGgoAAAANSUhEUgAAAf4AAAKcCAYAAAAJu9jpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAP
     */
    image: string;
  },
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postImages.key,
    undefined,
    objToForm(requestBody),
    undefined,
    overrideConfig(_CONSTANT2, configOverride)
  );
};

/** Key is end point string without base url */
postImages.key = "/images";

/**
 *
 * 基础指标上传
 */
export const postPerformancesBasicindicators = (
  requestBody: BasicIndicator,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postPerformancesBasicindicators.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPerformancesBasicindicators.key = "/performances/basicindicators";

/**
 *
 * 接口指标上传
 */
export const postPerformancesInterfaceindicators = (
  requestBody: InterfaceIndicator,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postPerformancesInterfaceindicators.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPerformancesInterfaceindicators.key = "/performances/interfaceindicators";

/**
 *
 * 资源指标上传
 */
export const postPerformancesResourceindicators = (
  requestBody: ResourceIndicator,
  configOverride?: AxiosRequestConfig
): Promise<SwaggerResponse<any>> => {
  return Http.postRequest(
    postPerformancesResourceindicators.key,
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
postPerformancesResourceindicators.key = "/performances/resourceindicators";

/**
 *
 * 修改文章
 */
export const putArticleArticleId = (
  /**
   *
   * 文章ID，eg：b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5
   */
  articleId: string,
  requestBody: Article,
  configOverride?: AxiosRequestConfig
): Promise<
  SwaggerResponse<{
    data: Article;
    /**
     *
     * 状态描述
     *
     */
    message: string;
    /**
     *
     * 状态编码
     *
     */
    status: number;
    /**
     *
     * 处理时间
     *
     */
    timestamp: string;
  }>
> => {
  return Http.putRequest(
    template(putArticleArticleId.key, { articleId }),
    undefined,
    requestBody,
    undefined,
    overrideConfig(_CONSTANT0, configOverride)
  );
};

/** Key is end point string without base url */
putArticleArticleId.key = "/article/{articleId}";
export const _CONSTANT0 = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export const _CONSTANT1 = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const _CONSTANT2 = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};
