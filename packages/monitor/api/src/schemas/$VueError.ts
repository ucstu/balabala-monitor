/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VueError = {
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
    errorTime: {
      type: "number",
      description: `错误时间`,
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
    stack: {
      type: "string",
      description: `错误堆栈`,
      isRequired: true,
    },
  },
} as const;
