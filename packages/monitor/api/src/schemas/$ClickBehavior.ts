/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ClickBehavior = {
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
    left: {
      type: "number",
      isRequired: true,
    },
    top: {
      type: "number",
      isRequired: true,
    },
    target: {
      type: "string",
      isRequired: true,
    },
    html: {
      type: "string",
      isRequired: true,
    },
    inner: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
