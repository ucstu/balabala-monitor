import { JueJinApiClient } from "@balabala/juejin-api";

export const client = new JueJinApiClient();

let {
  deleteArticle,
  getArticle,
  getArticle1,
  postAccounts,
  postAccountsLogin,
  postArticle,
  postImages,
  putArticle,
} = client.service;

deleteArticle = deleteArticle.bind(client.service);
getArticle = getArticle.bind(client.service);
getArticle1 = getArticle1.bind(client.service);
postAccounts = postAccounts.bind(client.service);
postAccountsLogin = postAccountsLogin.bind(client.service);
postArticle = postArticle.bind(client.service);
postImages = postImages.bind(client.service);
putArticle = putArticle.bind(client.service);

export {
  deleteArticle,
  getArticle,
  getArticle1,
  postAccounts,
  postAccountsLogin,
  postArticle,
  postImages,
  putArticle,
};
