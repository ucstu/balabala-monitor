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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 基础指标列表
     */
    data: Array<BasicIndicator>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/basicindicators",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 接口指标列表
     */
    data: Array<InterfaceIndicator>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/interfaceindicators",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 资源指标列表
     */
    data: Array<ResourceIndicator>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/resourceindicators",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父错误类型
     */
    type?: number;
    /**
     * 子错误类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 资源错误列表
     */
    data: Array<ResourceError>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/resourceerrors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
      },
    });
  }

  /**
   * 基础指标统计
   * @returns any 成功
   * @throws ApiError
   */
  public getPerformancesBasicindicatorstatistics({
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 基础指标统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/basicindicatorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 接口指标统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/interfaceindicatorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 资源指标统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/performances/resourceindicatorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 资源错误统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/resourceerrorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
        granularity: granularity,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父错误类型
     */
    type?: number;
    /**
     * 子错误类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * JavaScript错误列表
     */
    data: Array<JavaScriptError>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/javascripterrors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父错误类型
     */
    type?: number;
    /**
     * 子错误类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * Promise错误列表
     */
    data: Array<PromiseError>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/promiseerrors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父错误类型
     */
    type?: number;
    /**
     * 子错误类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * Vue错误列表
     */
    data: Array<VueError>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/vueerrors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
      },
    });
  }

  /**
   * JavaScript错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsJavascripterrorstatistics({
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * JS错误统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/javascripterrorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
        granularity: granularity,
      },
    });
  }

  /**
   * Promise错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsPromiseerrorstatistics({
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * Promise错误统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/promiseerrorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
        granularity: granularity,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父行为类型
     */
    type?: number;
    /**
     * 子行为类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 基础行为列表
     */
    data: Array<BasicBehavior>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/basicbehaviors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
      },
    });
  }

  /**
   * Vue错误统计
   * @returns any 成功
   * @throws ApiError
   */
  public getErrorsVueerrorstatistics({
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * Vue错误统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/errors/vueerrorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: string;
    subType?: string;
    top?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 点击行为列表
     */
    data: Array<ClickBehavior>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/clickbehaviors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: string;
    subType?: string;
    top?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 页面跳转行为列表
     */
    data: Array<PageSkipBehavior>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/pageskipbehaviors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
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
    timestamp: string;
    status: number;
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
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
  }: {
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: string;
    subType?: string;
    top?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 路由跳转行为列表
     */
    data: Array<RoutingSkipBehavior>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/routingskipbehaviors",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
      },
    });
  }

  /**
   * 基础行为统计
   * @returns any 成功
   * @throws ApiError
   */
  public getBehaviorsBasicbehaviorstatistics({
    appid,
    starttime,
    endtime,
    userid,
    pageurl,
    type,
    subType,
    top,
    granularity,
  }: {
    /**
     * 应用ID
     */
    appid: string;
    /**
     * 起始时间
     */
    starttime: string;
    /**
     * 结束时间
     */
    endtime: string;
    /**
     * 用户ID
     */
    userid?: string;
    /**
     * 页面路径
     */
    pageurl?: string;
    /**
     * 父指标类型
     */
    type?: number;
    /**
     * 子指标类型
     */
    subType?: number;
    /**
     * 排行前多少
     */
    top?: number;
    /**
     * 划分力度，eg：1s，1m，1h，1d，1M，1y
     */
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 基础行为统计列表
     */
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/behaviors/basicbehaviorstatistics",
      query: {
        appid: appid,
        userid: userid,
        pageurl: pageurl,
        type: type,
        subType: subType,
        starttime: starttime,
        endtime: endtime,
        top: top,
        granularity: granularity,
      },
    });
  }
}
