import {
  BaseHttpRequest,
  CancelablePromise,
  MonitorApiClient,
} from "@balabala/monitor-api";
import { ApiRequestOptions } from "@balabala/monitor-api/types/core/ApiRequestOptions";
import { getConfig } from "../config";

const originalProto = XMLHttpRequest.prototype;
const originalOpen = originalProto.open;
const originalSend = originalProto.send;

class OriginHttpRequest extends BaseHttpRequest {
  request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return new CancelablePromise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      originalOpen.call(xhr, options.method, options.url, true);
      originalSend.call(xhr, options.body);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.statusText);
          }
        }
      };
    });
  }
}

export const client = new MonitorApiClient(
  {
    BASE: getConfig().url,
  },
  OriginHttpRequest
);

const {
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
} = client.service;

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
