import type { ApiRequestOptions } from "./ApiRequestOptions";
import { CancelablePromise } from "./CancelablePromise";
import type { OnCancel } from "./CancelablePromise";
import type { OpenAPIConfig } from "./OpenAPI";
export declare const sendRequest: (
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  url: string,
  body: any,
  formData: FormData | undefined,
  headers: Headers,
  onCancel: OnCancel
) => Promise<XMLHttpRequest>;
export declare const request: <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions
) => CancelablePromise<T>;
