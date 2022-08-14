/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ResourceIndicator = {
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
    url: {
      type: "string",
      description: `资源路径`,
      isRequired: true,
    },
    duration: {
      type: "number",
      description: `加载耗时`,
      isRequired: true,
    },
    dns: {
      type: "number",
      description: `DNS耗时`,
      isRequired: true,
    },
    tcp: {
      type: "number",
      description: `TCP耗时`,
      isRequired: true,
    },
    redirect: {
      type: "number",
      description: `重定向耗时`,
      isRequired: true,
    },
    ttfb: {
      type: "number",
      description: `首字节时间`,
      isRequired: true,
    },
    protocol: {
      type: "string",
      description: `请求协议`,
      isRequired: true,
    },
    bodySize: {
      type: "number",
      description: `内容大小`,
      isRequired: true,
    },
    headerSize: {
      type: "number",
      description: `标头大小`,
      isRequired: true,
    },
    resourceSize: {
      type: "number",
      description: `资源大小`,
      isRequired: true,
    },
    isCache: {
      type: "boolean",
      description: `命中缓存`,
      isRequired: true,
    },
  },
} as const;
