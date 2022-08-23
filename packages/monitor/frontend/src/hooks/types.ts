import type { Dayjs } from "dayjs";

export interface BasicStatisticParam {
  startTime: Dayjs;
  endTime: Dayjs;
  userId?: string;
  pageUrl?: string;
  granularity?: string;
  _skip?: boolean;
}
export interface BasicStatisticItem {
  dateTime: string;
  count: number;
  average: number;
  userCount: number;
  pageCount: number;
}

export interface BasicQueryParam {
  startTime: Dayjs;
  endTime: Dayjs;
  userId?: string;
  pageUrl?: string;
  size?: number;
  _skip?: boolean;
}

export interface BasicQueryItem {
  count: number;
  average: number;
  userCount: number;
  userList: string[];
  pageCount: number;
  pageList: string[];
}
