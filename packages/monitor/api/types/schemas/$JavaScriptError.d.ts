export declare const $JavaScriptError: {
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
    readonly msg: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly line: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly column: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly stack: {
      readonly type: "string";
      readonly isRequired: true;
    };
  };
};
