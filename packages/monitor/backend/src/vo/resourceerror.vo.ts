import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export type ResourceerrorVo = BaseQueryVo;
export interface ResourceerrorTotalVo extends BaseTotalVo {
  /**
   * 资源路径
   */
  url?: string;
}
