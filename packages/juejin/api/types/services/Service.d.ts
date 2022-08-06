import type { Account } from "../models/Account";
import type { Article } from "../models/Article";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export declare class Service {
  readonly httpRequest: BaseHttpRequest;
  constructor(httpRequest: BaseHttpRequest);
  deleteArticle({ articleId }: { articleId: string }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Article;
  }>;
  putArticle({
    articleId,
    requestBody,
  }: {
    articleId: string;
    requestBody?: Article;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Article;
  }>;
  getArticle({ articleId }: { articleId: string }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Article;
  }>;
  postImages({
    formData,
  }: {
    formData?: {
      image: string;
      filename: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      imageUrl: string;
    };
  }>;
  postAccounts({
    requestBody,
  }: {
    requestBody?: {
      phone: string;
      password: string;
      name: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Account;
  }>;
  postAccountsLogin({
    requestBody,
  }: {
    requestBody?: {
      phone: string;
      password: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Account;
  }>;
  postArticle({
    token,
    requestBody,
  }: {
    token: string;
    requestBody?: {
      articleTitle: string;
      articleClass: number;
      articleTags: string;
      articleCover: string;
      articleSummary: string;
      articleContent: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: Article;
  }>;
  getArticle1({
    _class,
    page,
    size,
    sort,
  }: {
    _class: number;
    page?: number;
    size?: number;
    sort?: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    data: {
      totalCount: number;
      articleInfos: Array<Article>;
    };
  }>;
}
