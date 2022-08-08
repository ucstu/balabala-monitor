/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PromiseError = {
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
    stack: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
