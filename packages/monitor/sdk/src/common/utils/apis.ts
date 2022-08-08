import {
  BaseHttpRequest,
  CancelablePromise,
  MonitorApiClient,
} from "@balabala/monitor-api";
import { ApiRequestOptions } from "../types";
import { request } from "./request";

const originalProto = XMLHttpRequest.prototype;
const originalOpen = originalProto.open;
const originalSend = originalProto.send;

class OriginHttpRequest extends BaseHttpRequest {
  request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return request(this.config, options, originalOpen, originalSend);
  }
}

export const client = new MonitorApiClient({}, OriginHttpRequest);

let {
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

getBehaviorsBasicbehaviors = getBehaviorsBasicbehaviors.bind(client.service);
getBehaviorsBasicbehaviorstatistics = getBehaviorsBasicbehaviorstatistics.bind(
  client.service
);
getBehaviorsClickbehaviors = getBehaviorsClickbehaviors.bind(client.service);
getBehaviorsPageskipbehaviors = getBehaviorsPageskipbehaviors.bind(
  client.service
);
getBehaviorsRoutingskipbehaviors = getBehaviorsRoutingskipbehaviors.bind(
  client.service
);
getErrorsJavascripterrors = getErrorsJavascripterrors.bind(client.service);
getErrorsJavascripterrorstatistics = getErrorsJavascripterrorstatistics.bind(
  client.service
);
getErrorsPromiseerrors = getErrorsPromiseerrors.bind(client.service);
getErrorsPromiseerrorstatistics = getErrorsPromiseerrorstatistics.bind(
  client.service
);
getErrorsResourceerrors = getErrorsResourceerrors.bind(client.service);
getErrorsResourceerrorstatistics = getErrorsResourceerrorstatistics.bind(
  client.service
);
getErrorsVueerrors = getErrorsVueerrors.bind(client.service);
getErrorsVueerrorstatistics = getErrorsVueerrorstatistics.bind(client.service);
getPerformancesBasicindicators = getPerformancesBasicindicators.bind(
  client.service
);
getPerformancesBasicindicatorstatistics =
  getPerformancesBasicindicatorstatistics.bind(client.service);
getPerformancesInterfaceindicators = getPerformancesInterfaceindicators.bind(
  client.service
);
getPerformancesInterfaceindicatorstatistics =
  getPerformancesInterfaceindicatorstatistics.bind(client.service);
getPerformancesResourceindicators = getPerformancesResourceindicators.bind(
  client.service
);
getPerformancesResourceindicatorstatistics =
  getPerformancesResourceindicatorstatistics.bind(client.service);
postBehaviorsBasicbehaviors = postBehaviorsBasicbehaviors.bind(client.service);
postBehaviorsClickbehaviors = postBehaviorsClickbehaviors.bind(client.service);
postBehaviorsPageskipbehaviors = postBehaviorsPageskipbehaviors.bind(
  client.service
);
postBehaviorsRoutingskipbehaviors = postBehaviorsRoutingskipbehaviors.bind(
  client.service
);
postErrorsJavascripterrors = postErrorsJavascripterrors.bind(client.service);
postErrorsPromiseerrors = postErrorsPromiseerrors.bind(client.service);
postErrorsResourceerrors = postErrorsResourceerrors.bind(client.service);
postErrorsVueerrors = postErrorsVueerrors.bind(client.service);
postPerformancesBasicindicators = postPerformancesBasicindicators.bind(
  client.service
);
postPerformancesInterfaceindicators = postPerformancesInterfaceindicators.bind(
  client.service
);
postPerformancesResourceindicators = postPerformancesResourceindicators.bind(
  client.service
);

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
