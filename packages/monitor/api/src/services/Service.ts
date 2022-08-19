/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasicBehavior } from "../models/BasicBehavior";
import type { BasicIndicator } from "../models/BasicIndicator";
import type { ClickBehavior } from "../models/ClickBehavior";
import type { InterfaceIndicator } from "../models/InterfaceIndicator";
import type { JavaScriptError } from "../models/JavaScriptError";
import type { PageSkipBehavior } from "../models/PageSkipBehavior";
import type { PromiseError } from "../models/PromiseError";
import type { ResourceError } from "../models/ResourceError";
import type { ResourceIndicator } from "../models/ResourceIndicator";
import type { RoutingSkipBehavior } from "../models/RoutingSkipBehavior";
import type { VueError } from "../models/VueError";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class Service {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 基础指标上传
   * @returns any 成功
   * @throws ApiError
   */
  public postPerformancesBasicindicators({
    requestBody,
  }: {
    requestBody?: Array<BasicIndicator>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/performances/basicindicators",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 基础指标查询
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesBasicindicators({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 基础指标列表
     */
    data: {
      /**
       * 总条数
       */
      totalCount: number;
      items: Array<BasicIndicator>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/basicindicators",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 接口指标上传
   * @returns any 成功
   * @throws ApiError
   */
  public postPerformancesInterfaceindicators({
    requestBody,
  }: {
    requestBody?: Array<InterfaceIndicator>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/performances/interfaceindicators",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 接口指标查询
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesInterfaceindicators({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口指标列表
     */
    data: {
      items: Array<InterfaceIndicator>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/interfaceindicators",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 资源指标上传
   * @returns any 成功
   * @throws ApiError
   */
  public postPerformancesResourceindicators({
    requestBody,
  }: {
    requestBody?: Array<ResourceIndicator>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/performances/resourceindicators",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 资源指标查询
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesResourceindicators({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 资源指标列表
     */
    data: {
      items: Array<ResourceIndicator>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/resourceindicators",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 资源错误上传
   * @returns any 成功
   * @throws ApiError
   */
  public postErrorsResourceerrors({
    requestBody,
  }: {
    requestBody?: Array<ResourceError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/errors/resourceerrors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 资源错误查询
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsResourceerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * 资源错误列表
       */
      items: Array<ResourceError>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/resourceerrors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 基础指标统计
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesBasicindicatorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 基础指标统计列表
     */
    data: Array<
      Array<{
        /**
         * 日期时间
         */
        dateTime: string;
        /**
         * 统计总数
         */
        count: number;
        /**
         * 平均值
         */
        average: number;
      }>
    >;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/basicindicatorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
      },
    });
  }

  /**
   * 接口指标统计
   * 暂时只统计慢接口
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesInterfaceindicatorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口指标统计列表
     */
    data: Array<
      Array<{
        /**
         * 日期时间
         */
        dateTime: string;
        /**
         * 统计总数
         */
        count: number;
        /**
         * 平均值
         */
        average: number;
        /**
         * 影响用户数
         */
        userCount: number;
      }>
    >;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/interfaceindicatorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
      },
    });
  }

  /**
   * 资源指标统计
   * 暂时只统计慢资源
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesResourceindicatorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 资源指标统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 发生总数
       */
      count: number;
      /**
       * 页面总数
       */
      pageCount: number;
      /**
       * 用户总数
       */
      userCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/resourceindicatorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
      },
    });
  }

  /**
   * 资源错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsResourceerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 资源路径
     */
    url?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 资源错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 影响用户数
       */
      userCount: number;
      /**
       * 影响的页面数量
       */
      pageCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/resourceerrorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        url: url,
      },
    });
  }

  /**
   * JavaScript错误上传
   * @returns any 成功
   * @throws ApiError
   */
  public postErrorsJavascripterrors({
    requestBody,
  }: {
    requestBody?: Array<JavaScriptError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/errors/javascripterrors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * JavaScript错误查询
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsJavascripterrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * JavaScript错误列表
       */
      items: Array<JavaScriptError>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/javascripterrors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * Promise错误上传
   * @returns any 成功
   * @throws ApiError
   */
  public postErrorsPromiseerrors({
    requestBody,
  }: {
    requestBody?: Array<PromiseError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/errors/promiseerrors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Promise错误查询
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsPromiseerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * Promise错误列表
       */
      items: Array<PromiseError>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/promiseerrors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * Vue错误上传
   * @returns any 成功
   * @throws ApiError
   */
  public postErrorsVueerrors({
    requestBody,
  }: {
    requestBody?: Array<VueError>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/errors/vueerrors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Vue错误查询
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsVueerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * Vue错误列表
       */
      items: Array<VueError>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/vueerrors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * JavaScript错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsJavascripterrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
    msg,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 文件地址
     */
    url?: string;
    /**
     * 错误信息
     */
    msg?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * JS错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 影响用户数
       */
      userCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/javascripterrorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        url: url,
        msg: msg,
      },
    });
  }

  /**
   * Promise错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsPromiseerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    stack,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 调用堆栈
     */
    stack?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * Promise错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 影响用户数
       */
      userCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/promiseerrorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        stack: stack,
      },
    });
  }

  /**
   * 基础行为上传
   * @returns any 成功
   * @throws ApiError
   */
  public postBehaviorsBasicbehaviors({
    requestBody,
  }: {
    requestBody?: Array<BasicBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/behaviors/basicbehaviors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 基础行为查询
   * @returns any 成功
   * @throws ApiError
   */
  public getBehaviorsBasicbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * 基础行为列表
       */
      items: Array<BasicBehavior>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/basicbehaviors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * Vue错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsVueerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * Vue错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 影响用户数
       */
      userCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/vueerrorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
      },
    });
  }

  /**
   * 点击行为上传
   * @returns any 成功
   * @throws ApiError
   */
  public postBehaviorsClickbehaviors({
    requestBody,
  }: {
    requestBody?: Array<ClickBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/behaviors/clickbehaviors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 点击行为查询
   * @returns any 成功
   * @throws ApiError
   */
  public getBehaviorsClickbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * 点击行为列表
       */
      items: Array<ClickBehavior>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/clickbehaviors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 页面跳转行为上传
   * @returns any 成功
   * @throws ApiError
   */
  public postBehaviorsPageskipbehaviors({
    requestBody,
  }: {
    requestBody?: Array<PageSkipBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/behaviors/pageskipbehaviors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 页面跳转行为查询
   * @returns any 成功
   * @throws ApiError
   */
  public getBehaviorsPageskipbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * 页面跳转行为列表
       */
      items: Array<PageSkipBehavior>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/pageskipbehaviors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 路由跳转行为上传
   * @returns any 成功
   * @throws ApiError
   */
  public postBehaviorsRoutingskipbehaviors({
    requestBody,
  }: {
    requestBody?: Array<RoutingSkipBehavior>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/behaviors/routingskipbehaviors",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 路由跳转行为查询
   * @returns any 成功
   * @throws ApiError
   */
  public getBehaviorsRoutingskipbehaviors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    data: {
      /**
       * 总条数
       */
      totalCount: number;
      /**
       * 路由跳转行为列表
       */
      items: Array<RoutingSkipBehavior>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/routingskipbehaviors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 基础行为统计
   * @returns any 成功
   * @throws ApiError
   */
  public getBehaviorsBasicbehaviorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 基础行为统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 平均值
       */
      average: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/basicbehaviorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
      },
    });
  }

  /**
   * 接口错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsInterfaceerrorstatistics({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    url,
    statusCode,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 接口请求路径
     */
    url?: string;
    /**
     * 错误状态码，eg：500，400
     */
    statusCode?: number;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口错误统计列表
     */
    data: Array<{
      /**
       * 日期时间
       */
      dateTime: string;
      /**
       * 统计总数
       */
      count: number;
      /**
       * 影响用户数
       */
      userCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/interfaceerrorstatistics",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        url: url,
        status_code: statusCode,
      },
    });
  }

  /**
   * 接口错误查询
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsInterfaceerrors({
    appId,
    mainType,
    subType,
    startTime,
    endTime,
    userId,
    pageUrl,
    granularity,
    page,
    size,
    sort,
    statusCode,
  }: {
    /**
     * 应用ID
     */
    appId: string;
    /**
     * 父指标类型
     */
    mainType: number;
    /**
     * 子指标类型
     */
    subType: number;
    /**
     * 起始时间
     */
    startTime: string;
    /**
     * 结束时间
     */
    endTime: string;
    /**
     * 用户ID
     */
    userId?: string;
    /**
     * 页面路径
     */
    pageUrl?: string;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["value,desc"]
     */
    sort?: any[];
    /**
     * 状态码，eg：400
     */
    statusCode?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 接口错误列表
     */
    data: {
      items: Array<InterfaceIndicator>;
      /**
       * 总条数
       */
      totalCount: number;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/interfaceerrors",
      query: {
        app_id: appId,
        user_id: userId,
        page_url: pageUrl,
        main_type: mainType,
        sub_type: subType,
        start_time: startTime,
        end_time: endTime,
        granularity: granularity,
        page: page,
        size: size,
        sort: sort,
        status_code: statusCode,
      },
    });
  }
}
