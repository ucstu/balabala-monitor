import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export interface InterfaceerrorsTotalVo extends BaseTotalVo {
  url: string;
  /**
   * 错误状态码
   */
  statusCode: number;
}
export interface InterfaceerrorsVo extends BaseQueryVo {
  /**
   *接口请求路径
   */
  url: string;
  /**
   * 错误状态码
   */
  statusCode: number;
}
