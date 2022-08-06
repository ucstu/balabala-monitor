/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ResourceError = {
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
    resourceType: {
      type: "string",
      description: `eg：js、css、img、audio`,
      isRequired: true,
    },
    html: {
      type: "string",
      isRequired: true,
    },
    path: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
