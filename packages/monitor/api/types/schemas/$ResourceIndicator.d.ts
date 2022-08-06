export declare const $ResourceIndicator: {
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
    readonly startTime: {
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
    readonly duration: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly dns: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly tcp: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly redirect: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly ttfb: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly protocol: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly bodySize: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly headerSize: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly resourceSize: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly isCache: {
      readonly type: "boolean";
      readonly isRequired: true;
    };
  };
};
