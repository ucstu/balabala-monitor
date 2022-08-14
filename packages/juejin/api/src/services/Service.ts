/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from "../models/Account";
import type { Article } from "../models/Article";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class Service {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 删除文章
   * @returns any 成功
   * @throws ApiError
   */
  public deleteArticle({
    articleId,
  }: {
    /**
     * 文章ID，eg：b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5
     */
    articleId: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 文章信息
     */
    data: Article;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/article/{articleId}",
      path: {
        articleId: articleId,
      },
    });
  }

  /**
   * 修改文章
   * @returns any 成功
   * @throws ApiError
   */
  public putArticle({
    articleId,
    requestBody,
  }: {
    /**
     * 文章ID，eg：b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5
     */
    articleId: string;
    requestBody?: Article;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 文章信息
     */
    data: Article;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/article/{articleId}",
      path: {
        articleId: articleId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询文章
   * @returns any 成功
   * @throws ApiError
   */
  public getArticle({
    articleId,
  }: {
    /**
     * 文章ID，eg：b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5
     */
    articleId: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 文章信息
     */
    data: Article;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/article/{articleId}",
      path: {
        articleId: articleId,
      },
    });
  }

  /**
   * 上传图片
   * @returns any 成功
   * @throws ApiError
   */
  public postImages({
    formData,
  }: {
    formData?: {
      /**
       * 图片，base64字符串  去掉头信息的base64信息,不要    "data:image/jpeg;base64,"
       */
      image: string;
      /**
       * 文件名称，包括后缀名 app,pen
       */
      filename: string;
    };
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 数据主体
     */
    data: {
      /**
       * 图片地址
       */
      imageUrl: string;
    };
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/images",
      formData: formData,
      mediaType: "multipart/form-data",
    });
  }

  /**
   * 注册账号
   * @returns any 成功
   * @throws ApiError
   */
  public postAccounts({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 手机号码（登录用手机号，别用重复号码注册哈）
       */
      phone: string;
      /**
       * 用户密码
       */
      password: string;
      /**
       * 昵称可重复
       */
      name: string;
    };
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 账号信息
     */
    data: Account;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/accounts",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 登录账号
   * @returns any 成功
   * @throws ApiError
   */
  public postAccountsLogin({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 手机号
       */
      phone: string;
      /**
       * 用户密码
       */
      password: string;
    };
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 账号信息
     */
    data: Account;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/accounts/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 新增文章
   * @returns any 成功
   * @throws ApiError
   */
  public postArticle({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 文章标题
       */
      articleTitle: string;
      /**
       * {1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}
       */
      articleClass: number;
      /**
       * 文章标签
       */
      articleTags: string;
      /**
       * 文章封面
       */
      articleCover: string;
      /**
       * 文章概要
       */
      articleSummary: string;
      /**
       * 文章内容
       */
      articleContent: string;
    };
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 文章信息
     */
    data: Article;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/article",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有文章
   * @returns any 成功
   * @throws ApiError
   */
  public getArticle1({
    _class,
    page,
    size,
    sort,
  }: {
    /**
     * 文章分类，{0:不限,1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}，eg：1
     */
    _class: number;
    /**
     * 当前页号，eg: 2>1
     */
    page?: number;
    /**
     * 页面大小，eg：5
     */
    size?: number;
    /**
     * 排序方式： DESC 或者 ASC
     */
    sort?: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 状态编码
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 数据主体
     */
    data: {
      /**
       * 数据总数
       */
      totalCount: number;
      /**
       * 文章信息列表
       */
      articleInfos: Array<Article>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/article",
      query: {
        class: _class,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
