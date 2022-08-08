/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Article = {
  articleId: number;
  createdAt: string;
  updatedAt: string;
  articleTitle: string;
  /**
   * {1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}
   */
  articleClass: number;
  articleTags: string;
  articleCover: string;
  articleSummary: string;
  articleContent: string;
  phone: string;
  articleTraffic: number;
  articlelikes: number;
};
