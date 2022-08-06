import type { ApiRequestOptions } from "./ApiRequestOptions";
import { BaseHttpRequest } from "./BaseHttpRequest";
import type { CancelablePromise } from "./CancelablePromise";
import type { OpenAPIConfig } from "./OpenAPI";
export declare class XHRHttpRequest extends BaseHttpRequest {
  constructor(config: OpenAPIConfig);
  request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
