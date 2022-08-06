import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { Service } from "./services/Service";
declare type HttpRequestConstructor = new (
  config: OpenAPIConfig
) => BaseHttpRequest;
export declare class JueJinApiClient {
  readonly service: Service;
  readonly request: BaseHttpRequest;
  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest?: HttpRequestConstructor
  );
}
export {};
