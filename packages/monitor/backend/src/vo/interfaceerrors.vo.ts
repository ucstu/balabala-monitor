import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export type InterfaceerrorsTotalVo = BaseTotalVo;
export interface InterfaceerrorsVo extends BaseQueryVo {
  /**
   *接口请求路径
   */
  url: string;
}
