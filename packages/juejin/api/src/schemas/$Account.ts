/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Account = {
  properties: {
    id: {
      type: "number",
      isRequired: true,
    },
    phone: {
      type: "string",
      isRequired: true,
    },
    name: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
  },
} as const;
