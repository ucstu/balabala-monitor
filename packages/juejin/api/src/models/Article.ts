/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Article = {
  /**
   * 文章ID
   */
  articleId: number;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updatedAt: string;
  /**
   * 文章标题
   */
  articleTitle: string;
  /**
   * {1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}
   */
  articleClass: number;
  /**
   * 文章标签
   */
  articleTags: string;
  /**
   * 文章封面
   */
  articleCover: string;
  /**
   * 文章概要
   */
  articleSummary: string;
  /**
   * 文章内容
   */
  articleContent: string;
  /**
   * 发布用户ID
   */
  phone: string;
  /**
   * 文章访问量
   */
  articleTraffic: number;
  /**
   * 文章点赞量
   */
  articlelikes: number;
};
