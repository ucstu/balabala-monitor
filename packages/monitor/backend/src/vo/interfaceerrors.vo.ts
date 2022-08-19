import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export interface InterfaceerrorsTotalVo extends BaseTotalVo {
  /**
   * 接口请求路径
   */
  url: string;
  /**
   * 错误状态码
   */
  status_code: number;
}
export interface InterfaceerrorsVo extends BaseQueryVo {
  /**
   * 接口请求路径
   */
  url: string;
  /**
   * 错误状态码
   */
  status_code: number;
}
