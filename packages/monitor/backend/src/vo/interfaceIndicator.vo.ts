import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export type InterfaceIndicatorVo = BaseQueryVo;
export interface InterfaceIndicatorTotalVo extends BaseTotalVo {
  url: string;
}
