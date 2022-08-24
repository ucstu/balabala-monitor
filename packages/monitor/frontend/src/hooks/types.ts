import type { Dayjs } from "dayjs";

export interface BasicStatisticParam {
  /*
   * 开始时间
   */
  startTime: Dayjs;
  /*
   * 结束时间
   */
  endTime: Dayjs;
  /*
   * 用户ID
   */
  userId?: string;
  /*
   * 页面路径
   */
  pageUrl?: string;
  /*
   * 划分力度
   */
  granularity?: string;
  /*
   * 跳过此次更新
   */
  _skip?: boolean;
  /*
   * 懒惰加载（第一次不加载）
   */
  _lazy?: boolean;
}
export interface BasicStatisticItem {
  /*
   * 统计时间
   */
  dateTime: Dayjs;
  /*
   * 统计总数
   */
  count: number;
  /*
   * 平均值
   */
  average: number;
  /*
   * 用户数
   */
  userCount: number;
  /*
   * 页面数
   */
  pageCount: number;
}

export interface BasicQueryParam {
  /*
   * 开始时间
   */
  startTime: Dayjs;
  /*
   * 结束时间
   */
  endTime: Dayjs;
  /*
   * 用户ID
   */
  userId?: string;
  /*
   * 页面路径
   */
  pageUrl?: string;
  /*
   * 页面大小
   */
  size?: number;
  /*
   * 跳过此次更新
   */
  _skip?: boolean;
  /*
   * 懒惰加载（第一次不加载）
   */
  _lazy?: boolean;
}

export interface BasicQueryItem {
  /*
   * 统计总数
   */
  count: number;
  /*
   * 平均值
   */
  average: number;
  /*
   * 用户数
   */
  userCount: number;
  /*
   * 用户列表
   */
  userList: string[];
  /*
   * 页面数
   */
  pageCount: number;
  /*
   * 页面列表
   */
  pageList: string[];
}
