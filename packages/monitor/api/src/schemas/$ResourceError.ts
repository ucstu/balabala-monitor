/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ResourceError = {
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
    resourceType: {
      type: "string",
      description: `eg：js、css、img、audio`,
      isRequired: true,
    },
    html: {
      type: "string",
      description: `页面结构`,
      isRequired: true,
    },
    path: {
      type: "string",
      description: `资源路径`,
      isRequired: true,
    },
  },
} as const;
