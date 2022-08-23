export interface Statistic {
  dateTime: string;
  count: number;
  average: number;
  userCount: number;
  pageCount: number;
}

export interface BasicIndicatorItem {
  count: number;
  average: number;
  userCount: number;
  userList: string[];
  pageCount: number;
  pageList: string[];
}
