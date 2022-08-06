/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RoutingSkipBehavior = {
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
    from: {
      type: "string",
      isRequired: true,
    },
    to: {
      type: "string",
      isRequired: true,
    },
    params: {
      type: "string",
      isRequired: true,
    },
    query: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
