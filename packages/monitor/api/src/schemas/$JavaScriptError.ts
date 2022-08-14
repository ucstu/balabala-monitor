/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $JavaScriptError = {
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
    url: {
      type: "string",
      description: `文件路径`,
      isRequired: true,
    },
    msg: {
      type: "string",
      description: `错误消息`,
      isRequired: true,
    },
    line: {
      type: "number",
      description: `错误行号`,
      isRequired: true,
    },
    column: {
      type: "number",
      description: `错误列号`,
      isRequired: true,
    },
    stack: {
      type: "string",
      description: `错误调用堆栈`,
      isRequired: true,
    },
  },
} as const;
