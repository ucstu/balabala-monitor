import { BaseQueryVo, BaseTotalVo } from "src/vo/base.vo";

/**
 * 基类方法,构造body体
 * @param querys
 * @returns
 */
const getBaseBody = (querys: BaseQueryVo, timeName: string): any => {
  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              appId: querys.appid,
            },
          },
        ],
      },
    },
  };

  const range = {
    range: {},
  };
  range.range[timeName] = {
    gte: new Date(querys.starttime).getTime(),
    lte: new Date(querys.endtime).getTime(),
    //gte: 0,
    //lte: 1999999999,
  };
  body.query.bool.must.push(range as any);

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
        userID: querys.userid,
      },
    };
    body.query.bool.must.push(term);
  }
  //页面路径
  if (querys.pageurl) {
    const term = {
      term: {
        pageUrl: querys.pageurl,
      },
    };
    body.query.bool.must.push(term);
  }
  //父指标类型
  if (querys.type) {
    const term = {
      term: {
        mainType: querys.type,
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
  const msg = [];
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
export const getTotalBody = (
  querys: BaseTotalVo,
  timeName: "startTime" | "errorTime"
): any => {
  const body = getQueryBody(querys, timeName);
  const aggs = {
    count: {
      histogram: {
        field: timeName,
        interval: 1, // 间隔时间
        min_doc_count: 1, // 忽略统计数为0的
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
export const getQueryBody = (
  querys: BaseQueryVo,
  timeName: "startTime" | "errorTime"
): any => {
  const body = getBaseBody(querys, timeName);
  return body;
};

export const getPerformancesBasicindicatorsBody = (
  querys: BaseQueryVo,
  timeName: "startTime" | "errorTime"
) => {
  const body = getBaseBody(querys, timeName);
  const aggs = {
    count: {
      range: {
        field: "value",
        ranges: [
          {
            from: 0,
            to: 1000,
          },
          {
            from: 1000,
            to: 5000,
          },
          {
            from: 5000,
            to: 10000,
          },
          {
            from: 10000,
            to: 300000,
          },
          {
            from: 300000,
          },
        ],
      },
      aggs: {
        list: {
          histogram: {
            field: "startTime",
            interval: 86400000,
            min_doc_count: 0,
          },
          aggs: {
            avg: {
              avg: {
                field: "value",
              },
            },
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};
