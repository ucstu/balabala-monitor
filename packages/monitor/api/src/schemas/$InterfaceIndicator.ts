/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InterfaceIndicator = {
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
    statusCode: {
      type: "number",
      description: `状态编码`,
      isRequired: true,
    },
    method: {
      type: "string",
      description: `请求方法`,
      isRequired: true,
    },
    duration: {
      type: "number",
      description: `接口耗时`,
      isRequired: true,
    },
    url: {
      type: "string",
      description: `接口地址`,
      isRequired: true,
    },
    data: {
      type: "string",
      description: `接口数据`,
      isRequired: true,
    },
  },
} as const;
