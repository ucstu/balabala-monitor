/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PageSkipBehavior = {
  properties: {
    appId: {
      type: "string",
      description: `应用ID`,
      isRequired: true,
    },
    mainType: {
      type: "Enum",
      isRequired: true,
    },
    subType: {
      type: "Enum",
      isRequired: true,
    },
    startTime: {
      type: "number",
      description: `开始时间`,
      isRequired: true,
    },
    pageUrl: {
      type: "string",
      description: `页面路径`,
      isRequired: true,
    },
    userID: {
      type: "string",
      description: `用户ID`,
      isRequired: true,
    },
    from: {
      type: "string",
      description: `路由跳转起步位置`,
      isRequired: true,
    },
    to: {
      type: "string",
      description: `路由跳转目的位置`,
      isRequired: true,
    },
  },
} as const;
