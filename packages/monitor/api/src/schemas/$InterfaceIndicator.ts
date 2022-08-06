/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InterfaceIndicator = {
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
    statusCode: {
      type: "number",
      isRequired: true,
    },
    method: {
      type: "string",
      isRequired: true,
    },
    duration: {
      type: "number",
      isRequired: true,
    },
    url: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
