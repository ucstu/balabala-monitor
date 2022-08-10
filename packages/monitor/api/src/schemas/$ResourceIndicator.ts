/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ResourceIndicator = {
  properties: {
    appId: {
      type: "string",
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
      isRequired: true,
    },
    pageUrl: {
      type: "string",
      isRequired: true,
    },
    userID: {
      type: "string",
      isRequired: true,
    },
    url: {
      type: "string",
      isRequired: true,
    },
    duration: {
      type: "number",
      isRequired: true,
    },
    dns: {
      type: "number",
      isRequired: true,
    },
    tcp: {
      type: "number",
      isRequired: true,
    },
    redirect: {
      type: "number",
      isRequired: true,
    },
    ttfb: {
      type: "number",
      isRequired: true,
    },
    protocol: {
      type: "string",
      isRequired: true,
    },
    bodySize: {
      type: "number",
      isRequired: true,
    },
    headerSize: {
      type: "number",
      isRequired: true,
    },
    resourceSize: {
      type: "number",
      isRequired: true,
    },
    isCache: {
      type: "boolean",
      isRequired: true,
    },
  },
} as const;
