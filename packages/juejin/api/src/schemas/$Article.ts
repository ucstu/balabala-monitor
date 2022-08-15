/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Article = {
  properties: {
    articleId: {
      type: "number",
      description: `文章ID`,
      isRequired: true,
    },
    createdAt: {
      type: "string",
      description: `创建时间`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `更新时间`,
      isRequired: true,
    },
    articleTitle: {
      type: "string",
      description: `文章标题`,
      isRequired: true,
    },
    articleClass: {
      type: "number",
      description: `{1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}`,
      isRequired: true,
    },
    articleTags: {
      type: "string",
      description: `文章标签`,
      isRequired: true,
    },
    articleCover: {
      type: "string",
      description: `文章封面`,
      isRequired: true,
    },
    articleSummary: {
      type: "string",
      description: `文章概要`,
      isRequired: true,
    },
    articleContent: {
      type: "string",
      description: `文章内容`,
      isRequired: true,
    },
    phone: {
      type: "string",
      description: `发布用户ID`,
      isRequired: true,
    },
    articleTraffic: {
      type: "number",
      description: `文章访问量`,
      isRequired: true,
    },
    articlelikes: {
      type: "number",
      description: `文章点赞量`,
      isRequired: true,
    },
  },
} as const;
