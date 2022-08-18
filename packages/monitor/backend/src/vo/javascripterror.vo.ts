import { BaseQueryVo, BaseTotalVo } from "./base.vo";

export type JavaScriptErrorVo = BaseQueryVo;
export interface JavaScriptErrorTotalVo extends BaseTotalVo {
  /**
   * 错误信息
   */
  msg: string;
  /**
   * 源文件地址
   */
  url: string;
}
