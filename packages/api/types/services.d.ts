import { AxiosRequestConfig } from "axios";
import { SwaggerResponse } from "./config";
import {
  Account,
  Article,
  BasicBehavior,
  BasicIndicator,
  ClickBehavior,
  GetArticleQueryParams,
  GetBehaviorsBasicbehaviorsQueryParams,
  GetBehaviorsBasicbehaviorstatisticsQueryParams,
  GetBehaviorsClickbehaviorsQueryParams,
  GetBehaviorsPageskipbehaviorsQueryParams,
  GetBehaviorsRoutingskipbehaviorsQueryParams,
  GetErrorsJavascripterrorsQueryParams,
  GetErrorsJavascripterrorstatisticsQueryParams,
  GetErrorsPromiseerrorsQueryParams,
  GetErrorsPromiseerrorstatisticsQueryParams,
  GetErrorsResourceerrorsQueryParams,
  GetErrorsResourceerrorstatisticsQueryParams,
  GetErrorsVueerrorstatisticsQueryParams,
  GetPerformancesBasicindicatorsQueryParams,
  GetPerformancesBasicindicatorstatisticsQueryParams,
  GetPerformancesInterfaceindicatorsQueryParams,
  GetPerformancesInterfaceindicatorstatisticsQueryParams,
  GetPerformancesResourceindicatorsQueryParams,
  GetPerformancesResourceindicatorstatisticsQueryParams,
  InterfaceIndicator,
  JavaScriptError,
  PageSkipBehavior,
  PromiseError,
  ResourceError,
  ResourceIndicator,
  RoutingSkipBehavior,
  VueError,
} from "./types";
export declare function template(
  path: string,
  obj?: {
    [x: string]: any;
  }
): string;
export declare const deleteArticleArticleId: {
  (articleId: string, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<{
      data: Article;
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getArticle: {
  (
    queryParams: GetArticleQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        articleInfos: Article[];
        totalCount: number;
      };
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getArticleArticleId: {
  (articleId: string, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<{
      data: Article;
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getBehaviorsBasicbehaviors: {
  (
    queryParams: GetBehaviorsBasicbehaviorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: BasicBehavior[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getBehaviorsBasicbehaviorstatistics: {
  (
    queryParams: GetBehaviorsBasicbehaviorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getBehaviorsClickbehaviors: {
  (
    queryParams: GetBehaviorsClickbehaviorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: ClickBehavior[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getBehaviorsPageskipbehaviors: {
  (
    queryParams: GetBehaviorsPageskipbehaviorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: PageSkipBehavior[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getBehaviorsRoutingskipbehaviors: {
  (
    queryParams: GetBehaviorsRoutingskipbehaviorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: RoutingSkipBehavior[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsJavascripterrors: {
  (
    queryParams: GetErrorsJavascripterrorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: JavaScriptError[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsJavascripterrorstatistics: {
  (
    queryParams: GetErrorsJavascripterrorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsPromiseerrors: {
  (
    queryParams: GetErrorsPromiseerrorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: VueError[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsPromiseerrorstatistics: {
  (
    queryParams: GetErrorsPromiseerrorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsResourceerrors: {
  (
    queryParams: GetErrorsResourceerrorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: ResourceError[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsResourceerrorstatistics: {
  (
    queryParams: GetErrorsResourceerrorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getErrorsVueerrorstatistics: {
  (
    queryParams: GetErrorsVueerrorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getPerformancesBasicindicators: {
  (
    queryParams: GetPerformancesBasicindicatorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: BasicIndicator[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getPerformancesBasicindicatorstatistics: {
  (
    queryParams: GetPerformancesBasicindicatorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getPerformancesInterfaceindicators: {
  (
    queryParams: GetPerformancesInterfaceindicatorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: InterfaceIndicator[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getPerformancesInterfaceindicatorstatistics: {
  (
    queryParams: GetPerformancesInterfaceindicatorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getPerformancesResourceindicators: {
  (
    queryParams: GetPerformancesResourceindicatorsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: ResourceIndicator[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const getPerformancesResourceindicatorstatistics: {
  (
    queryParams: GetPerformancesResourceindicatorstatisticsQueryParams,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: {
        count: number;
        datetime: string;
      }[];
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const postAccounts: {
  (
    requestBody: {
      name: string;
      password: string;
      phone: string;
    },
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  key: string;
};
export declare const postAccountsLogin: {
  (
    requestBody: {
      password: string;
      phone: string;
    },
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: Account;
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const postArticle: {
  (
    requestBody: {
      articleClass: number;
      articleContent: string;
      articleCover: string;
      articleSummary: string;
      articleTags: string;
      articleTitle: string;
    },
    headerParams?: {
      token: string;
    },
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  key: string;
};
export declare const postBehaviorsBasicbehaviors: {
  (requestBody: BasicBehavior, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postBehaviorsClickbehaviors: {
  (requestBody: ClickBehavior, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postBehaviorsPageskipbehaviors: {
  (requestBody: PageSkipBehavior, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postBehaviorsRoutingskipbehaviors: {
  (
    requestBody: RoutingSkipBehavior,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  key: string;
};
export declare const postErrorsJavascripterrors: {
  (requestBody: JavaScriptError, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postErrorsPromiseerrors: {
  (requestBody: PromiseError, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postErrorsResourceerrors: {
  (requestBody: ResourceError, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postErrorsVueerrors: {
  (requestBody: VueError, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postImages: {
  (
    requestBody: {
      filename: string;
      image: string;
    },
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  key: string;
};
export declare const postPerformancesBasicindicators: {
  (requestBody: BasicIndicator, configOverride?: AxiosRequestConfig): Promise<
    SwaggerResponse<any>
  >;
  key: string;
};
export declare const postPerformancesInterfaceindicators: {
  (
    requestBody: InterfaceIndicator,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  key: string;
};
export declare const postPerformancesResourceindicators: {
  (
    requestBody: ResourceIndicator,
    configOverride?: AxiosRequestConfig
  ): Promise<SwaggerResponse<any>>;
  key: string;
};
export declare const putArticleArticleId: {
  (
    articleId: string,
    requestBody: Article,
    configOverride?: AxiosRequestConfig
  ): Promise<
    SwaggerResponse<{
      data: Article;
      message: string;
      status: number;
      timestamp: string;
    }>
  >;
  key: string;
};
export declare const _CONSTANT0: {
  headers: {
    "Content-Type": string;
    Accept: string;
  };
};
export declare const _CONSTANT1: {
  "Content-Type": string;
  Accept: string;
};
export declare const _CONSTANT2: {
  headers: {
    "Content-Type": string;
    Accept: string;
  };
};
