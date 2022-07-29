import axios from "axios";

// github 名称
const githubName = "zhangtengfei-creator";
// 仓库名称
const repoName = "qing_xun_ying_image";
// github token
const token = "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";

/**
 * 文件上传到服务器
 * @param base64  去掉头信息的base64信息,不要    data:image/jpeg;base64,
 * @param fileName 文件名称,包含文件后缀
 * @returns url 图片的网络地址(cdn)
 * https://testingcf.jsdelivr.net/gh/zhangtengfei-creator/qing_xun_ying_image@main/a.jpg
 */
export const uploadImage = async (
  base64: string,
  fileName: string
): Promise<string | null> => {
  const result = await axios.put(
    `https://api.github.com/repos/${githubName}/${repoName}/contents/${fileName}`,
    {
      message: "add image",
      content: base64,
    },
    { headers: { Authorization: `token ${token}` } }
  );
  if (result.status === 201) {
    const url = `https://testingcf.jsdelivr.net/gh/${githubName}/${repoName}@main/${fileName}`;
    return url;
  } else {
    return null;
  }
};
