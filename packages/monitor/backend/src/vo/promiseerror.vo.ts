import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export type PromiseerrorVo = BaseQueryVo;
export interface PromiseerrorTotalVo extends BaseTotalVo {
  /**
   *错误调用堆栈
   */
  stack: string;
}
