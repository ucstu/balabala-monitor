export declare const $ResourceError: {
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
    readonly resourceType: {
      readonly type: "string";
      readonly description: "eg：js、css、img、audio";
      readonly isRequired: true;
    };
    readonly html: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly path: {
      readonly type: "string";
      readonly isRequired: true;
    };
  };
};
