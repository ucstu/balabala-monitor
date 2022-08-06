export declare const $PromiseError: {
  readonly properties: {
    readonly appId: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly mainType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly subType: {
      readonly type: "Enum";
      readonly isRequired: true;
    };
    readonly errorTime: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly pageUrl: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly userID: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly stack: {
      readonly type: "string";
      readonly isRequired: true;
    };
  };
};
