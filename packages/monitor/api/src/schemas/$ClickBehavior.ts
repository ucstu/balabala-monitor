/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClickBehavior = {
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
    left: {
      type: "number",
      description: `点击位置距离页面左端距离`,
      isRequired: true,
    },
    top: {
      type: "number",
      description: `点击位置距离页面顶端距离`,
      isRequired: true,
    },
    target: {
      type: "string",
      description: `点击对象`,
      isRequired: true,
    },
    html: {
      type: "string",
      description: `页面结构`,
      isRequired: true,
    },
    inner: {
      type: "string",
      description: `内部文本`,
      isRequired: true,
    },
  },
} as const;
