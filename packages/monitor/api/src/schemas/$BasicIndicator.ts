/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BasicIndicator = {
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
    value: {
      type: "number",
      description: `指标数值`,
      isRequired: true,
    },
  },
} as const;
