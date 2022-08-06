export declare const $Article: {
  readonly properties: {
    readonly articleId: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly createdAt: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly updatedAt: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly articleTitle: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly articleClass: {
      readonly type: "number";
      readonly description: "{1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}";
      readonly isRequired: true;
    };
    readonly articleTags: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly articleCover: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly articleSummary: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly articleContent: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly phone: {
      readonly type: "string";
      readonly isRequired: true;
    };
    readonly articleTraffic: {
      readonly type: "number";
      readonly isRequired: true;
    };
    readonly articlelikes: {
      readonly type: "number";
      readonly isRequired: true;
    };
  };
};
