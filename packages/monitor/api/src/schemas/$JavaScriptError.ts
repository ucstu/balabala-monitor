/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $JavaScriptError = {
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
    errorTime: {
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
    msg: {
      type: "string",
      isRequired: true,
    },
    line: {
      type: "number",
      isRequired: true,
    },
    column: {
      type: "number",
      isRequired: true,
    },
    stack: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
