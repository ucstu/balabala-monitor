export interface BaseQueryVo {
  /**
   * 应用ID
   */
  appid: string;
  /**
   *用户ID
   */
  userid?: string;
  /**
   *页面路径
   */
  pageurl?: string;
  /**
   *父指标类型
   */
  type?: number;
  /**
   * 子指标类型
   */
  subType?: number;
  /**
   *起始时间
   */
  starttime: string;
  /**
   *结束时间
   */
  endtime: string;
  /**
   *排行前多少
   */
  top?: number;
}

export interface BaseTotalVo extends BaseQueryVo {
  /**
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
}
