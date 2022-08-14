/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Account = {
  properties: {
    id: {
      type: "number",
      description: `账号ID`,
      isRequired: true,
    },
    phone: {
      type: "string",
      description: `电话号码`,
      isRequired: true,
    },
    name: {
      type: "string",
      description: `昵称`,
      isRequired: true,
    },
    password: {
      type: "string",
      description: `用户名称`,
      isRequired: true,
    },
  },
} as const;
