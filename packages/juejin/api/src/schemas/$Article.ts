/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Article = {
  properties: {
    articleId: {
      type: "number",
      isRequired: true,
    },
    createdAt: {
      type: "string",
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      isRequired: true,
    },
    articleTitle: {
      type: "string",
      isRequired: true,
    },
    articleClass: {
      type: "number",
      description: `{1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}`,
      isRequired: true,
    },
    articleTags: {
      type: "string",
      isRequired: true,
    },
    articleCover: {
      type: "string",
      isRequired: true,
    },
    articleSummary: {
      type: "string",
      isRequired: true,
    },
    articleContent: {
      type: "string",
      isRequired: true,
    },
    phone: {
      type: "string",
      isRequired: true,
    },
    articleTraffic: {
      type: "number",
      isRequired: true,
    },
    articlelikes: {
      type: "number",
      isRequired: true,
    },
  },
} as const;
