/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { XHRHttpRequest } from "./core/XHRHttpRequest";

import { Service } from "./services/Service";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class JueJinApiClient {
  public readonly service: Service;

  public readonly request: BaseHttpRequest;

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = XHRHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "1.0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.service = new Service(this.request);
  }
}
