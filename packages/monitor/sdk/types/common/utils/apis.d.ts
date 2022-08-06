import { CancelablePromise, MonitorApiClient } from "@balabala/monitor-api";
export declare const client: MonitorApiClient;
declare const getBehaviorsBasicbehaviors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").BasicBehavior[];
  }>,
  getBehaviorsBasicbehaviorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getBehaviorsClickbehaviors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: string | undefined;
    subType?: string | undefined;
    top?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").ClickBehavior[];
  }>,
  getBehaviorsPageskipbehaviors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: string | undefined;
    subType?: string | undefined;
    top?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").PageSkipBehavior[];
  }>,
  getBehaviorsRoutingskipbehaviors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: string | undefined;
    subType?: string | undefined;
    top?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").RoutingSkipBehavior[];
  }>,
  getErrorsJavascripterrors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").JavaScriptError[];
  }>,
  getErrorsJavascripterrorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getErrorsPromiseerrors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").PromiseError[];
  }>,
  getErrorsPromiseerrorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getErrorsResourceerrors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").ResourceError[];
  }>,
  getErrorsResourceerrorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getErrorsVueerrors: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").VueError[];
  }>,
  getErrorsVueerrorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getPerformancesBasicindicators: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").BasicIndicator[];
  }>,
  getPerformancesBasicindicatorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getPerformancesInterfaceindicators: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").InterfaceIndicator[];
  }>,
  getPerformancesInterfaceindicatorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  getPerformancesResourceindicators: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: import("@balabala/monitor-api").ResourceIndicator[];
  }>,
  getPerformancesResourceindicatorstatistics: ({
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
    userid?: string | undefined;
    pageurl?: string | undefined;
    type?: number | undefined;
    subType?: number | undefined;
    top?: number | undefined;
    granularity?: string | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      datetime: string;
      count: number;
    }[];
  }>,
  postBehaviorsBasicbehaviors: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").BasicBehavior[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postBehaviorsClickbehaviors: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").ClickBehavior[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postBehaviorsPageskipbehaviors: ({
    requestBody,
  }: {
    requestBody?:
      | import("@balabala/monitor-api").PageSkipBehavior[]
      | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postBehaviorsRoutingskipbehaviors: ({
    requestBody,
  }: {
    requestBody?:
      | import("@balabala/monitor-api").RoutingSkipBehavior[]
      | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postErrorsJavascripterrors: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").JavaScriptError[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postErrorsPromiseerrors: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").PromiseError[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postErrorsResourceerrors: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").ResourceError[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postErrorsVueerrors: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").VueError[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postPerformancesBasicindicators: ({
    requestBody,
  }: {
    requestBody?: import("@balabala/monitor-api").BasicIndicator[] | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postPerformancesInterfaceindicators: ({
    requestBody,
  }: {
    requestBody?:
      | import("@balabala/monitor-api").InterfaceIndicator[]
      | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>,
  postPerformancesResourceindicators: ({
    requestBody,
  }: {
    requestBody?:
      | import("@balabala/monitor-api").ResourceIndicator[]
      | undefined;
  }) => CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
  }>;
export {
  getBehaviorsBasicbehaviors,
  getBehaviorsBasicbehaviorstatistics,
  getBehaviorsClickbehaviors,
  getBehaviorsPageskipbehaviors,
  getBehaviorsRoutingskipbehaviors,
  getErrorsJavascripterrors,
  getErrorsJavascripterrorstatistics,
  getErrorsPromiseerrors,
  getErrorsPromiseerrorstatistics,
  getErrorsResourceerrors,
  getErrorsResourceerrorstatistics,
  getErrorsVueerrors,
  getErrorsVueerrorstatistics,
  getPerformancesBasicindicators,
  getPerformancesBasicindicatorstatistics,
  getPerformancesInterfaceindicators,
  getPerformancesInterfaceindicatorstatistics,
  getPerformancesResourceindicators,
  getPerformancesResourceindicatorstatistics,
  postBehaviorsBasicbehaviors,
  postBehaviorsClickbehaviors,
  postBehaviorsPageskipbehaviors,
  postBehaviorsRoutingskipbehaviors,
  postErrorsJavascripterrors,
  postErrorsPromiseerrors,
  postErrorsResourceerrors,
  postErrorsVueerrors,
  postPerformancesBasicindicators,
  postPerformancesInterfaceindicators,
  postPerformancesResourceindicators,
};
