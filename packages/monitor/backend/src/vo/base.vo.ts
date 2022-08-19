export interface BaseQueryVo {
  /**
   * 应用ID
   */
  app_id: string;
  /**
   *用户ID
   */
  user_id?: string;
  /**
   *页面路径
   */
  page_url?: string;
  /**
   *父指标类型
   */
  main_type?: number;
  /**
   * 子指标类型
   */
  sub_type?: number;
  /**
   *起始时间
   */
  start_time: string;
  /**
   *结束时间
   */
  end_time: string;
  /**
   * 第几页
   */
  page?: number;
  /**
   * 一页显示多少条
   */
  size?: number;
  /**
   * ["createdAt,desc"]
   */
  sort?: string[];
}

export interface BaseTotalVo extends BaseQueryVo {
  /**
   * 划分力度，eg：1s，1m，1h，1d，1M，1y
   */
  granularity?: string;
}
