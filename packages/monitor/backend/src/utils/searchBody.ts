import { BaseQueryVo, BaseTotalVo } from "src/vo/base.vo";

/**
 * 基类方法,构造body体
 * @param querys
 * @returns
 */
const getBaseBody = (querys: BaseQueryVo): any => {
  const body: any = {
    query: {
      bool: {
        must: [
          {
            term: {
              appId: querys.appid,
            },
          },
          {
            range: {
              errorTime: {
                gte: 1654412803,
                lte: 1659412803,
              },
            },
          },
        ],
      },
    },
  };
  // 组装非必选
  notChoice(body, querys);
  return body;
};

/**
 * 组装非必选
 * @param body 构造体
 * @param querys  BaseQueryVo 条件对象
 */
const notChoice = (body: any, querys: BaseQueryVo): void => {
  // 用户id
  if (querys.userid) {
    const term = {
      term: {
        userid: querys.userid,
      },
    };
    body.query.bool.must.push(term);
  }
  //页面路径
  if (querys.pageurl) {
    const term = {
      term: {
        pageurl: querys.pageurl,
      },
    };
    body.query.bool.must.push(term);
  }
  //父指标类型
  if (querys.type) {
    const term = {
      term: {
        type: querys.type,
      },
    };
    body.query.bool.must.push(term);
  }
  //子指标类型
  if (querys.subType) {
    const term = {
      term: {
        subType: querys.subType,
      },
    };
    body.query.bool.must.push(term);
  }
};

/**
 * 参数校验
 * @param querys
 * @returns 如果错误信息存在则表示参数校验失败
 */
export const valida = (querys: BaseQueryVo): string => {
  let msg = [];
  if (!querys.appid) {
    msg.push("appid 不能为空");
  }

  if (!querys.starttime || !querys.endtime) {
    msg.push("开始时间和结束时间不能为空");
  }
  if (msg.length === 0) {
    return null;
  } else {
    return msg.join(",");
  }
};

/**
 * 获取统计构造体
 * @param querys
 * @returns
 */
export const getTotalBody = (querys: BaseTotalVo): any => {
  const body = getQueryBody(querys);
  const aggs = {
    count: {
      histogram: {
        field: "errorTime",
        interval: 300,
        min_doc_count: 1,
      },
    },
  };
  body.aggs = aggs;
  return body;
};

/**
 * 获取查询构造体
 * @param querys
 * @returns
 */
export const getQueryBody = (querys: BaseQueryVo): any => {
  const body = getBaseBody(querys);
  return body;
};
