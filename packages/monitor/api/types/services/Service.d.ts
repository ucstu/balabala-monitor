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
export declare class Service {
  readonly httpRequest: BaseHttpRequest;
  constructor(httpRequest: BaseHttpRequest);
  postPerformancesBasicindicators({
    requestBody,
  }: {
    requestBody?: Array<BasicIndicator>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getPerformancesBasicindicators({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<BasicIndicator>;
  }>;
  postPerformancesInterfaceindicators({
    requestBody,
  }: {
    requestBody?: Array<InterfaceIndicator>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getPerformancesInterfaceindicators({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<InterfaceIndicator>;
  }>;
  postPerformancesResourceindicators({
    requestBody,
  }: {
    requestBody?: Array<ResourceIndicator>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getPerformancesResourceindicators({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<ResourceIndicator>;
  }>;
  postErrorsResourceerrors({
    requestBody,
  }: {
    requestBody?: Array<ResourceError>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getErrorsResourceerrors({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<ResourceError>;
  }>;
  getPerformancesBasicindicatorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  getPerformancesInterfaceindicatorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  getPerformancesResourceindicatorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  getErrorsResourceerrorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  postErrorsJavascripterrors({
    requestBody,
  }: {
    requestBody?: Array<JavaScriptError>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getErrorsJavascripterrors({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<JavaScriptError>;
  }>;
  postErrorsPromiseerrors({
    requestBody,
  }: {
    requestBody?: Array<PromiseError>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getErrorsPromiseerrors({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<PromiseError>;
  }>;
  postErrorsVueerrors({
    requestBody,
  }: {
    requestBody?: Array<VueError>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getErrorsVueerrors({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<VueError>;
  }>;
  getErrorsJavascripterrorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  getErrorsPromiseerrorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  postBehaviorsBasicbehaviors({
    requestBody,
  }: {
    requestBody?: Array<BasicBehavior>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getBehaviorsBasicbehaviors({
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
    type?: number;
    subType?: number;
    top?: number;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<BasicBehavior>;
  }>;
  getErrorsVueerrorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
  postBehaviorsClickbehaviors({
    requestBody,
  }: {
    requestBody?: Array<ClickBehavior>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getBehaviorsClickbehaviors({
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
    data: Array<ClickBehavior>;
  }>;
  postBehaviorsPageskipbehaviors({
    requestBody,
  }: {
    requestBody?: Array<PageSkipBehavior>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getBehaviorsPageskipbehaviors({
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
    data: Array<PageSkipBehavior>;
  }>;
  postBehaviorsRoutingskipbehaviors({
    requestBody,
  }: {
    requestBody?: Array<RoutingSkipBehavior>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
  getBehaviorsRoutingskipbehaviors({
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
    data: Array<RoutingSkipBehavior>;
  }>;
  getBehaviorsBasicbehaviorstatistics({
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
    appid: string;
    starttime: string;
    endtime: string;
    userid?: string;
    pageurl?: string;
    type?: number;
    subType?: number;
    top?: number;
    granularity?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Array<{
      datetime: string;
      count: number;
    }>;
  }>;
}
