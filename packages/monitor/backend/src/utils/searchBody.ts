import { BaseQueryVo, BaseTotalVo } from "src/vo/base.vo";
import { BasicBehaviorTotalVo } from "src/vo/BasicBehavior.vo";
import {
  InterfaceerrorsTotalVo,
  InterfaceerrorsVo,
} from "src/vo/interfaceerrors.vo";
import { InterfaceIndicatorTotalVo } from "src/vo/interfaceIndicator.vo";
import { JavaScriptErrorTotalVo } from "src/vo/javascripterror.vo";
import { PromiseerrorTotalVo } from "src/vo/promiseerror.vo";
import { ResourceerrorTotalVo } from "src/vo/resourceerror.vo";

const getTime = (timeStr: string): number => {
  const map = {
    "1d": 1000 * 1 * 60 * 60 * 24,
    "1h": 1000 * 1 * 60 * 60,
    "1m": 1000 * 1 * 60,
    "1s": 1000 * 1,
  };

  return map[timeStr];
};

/**
 * 基类方法,构造body体
 * @param querys
 * @returns
 */
const getBaseBody = (querys: BaseQueryVo, timeName: string): any => {
  // 基本查询条件
  const body: any = {
    query: {
      bool: {
        must: [
          {
            term: {
              appId: querys.app_id,
            },
          },
          {
            term: {
              mainType: querys.main_type,
            },
          },
          {
            term: {
              subType: querys.sub_type,
            },
          },
        ],
      },
    },
  };

  // 时间范围条件
  const range = {
    range: {},
  };

  // 如果时间位数不足，则补0
  if (querys.start_time.length === 10) {
    querys.start_time = querys.start_time + " 00:00:00";
    querys.end_time = querys.end_time + " 00:00:00";
  }

  // 设置时间范围
  range.range[timeName] = {
    gte: new Date(querys.start_time).getTime(),
    lte: new Date(querys.end_time).getTime(),
  };

  // 在查询条件中添加时间范围
  body.query.bool.must.push(range);

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
  if (querys.user_id) {
    const term = {
      term: {
        userID: querys.user_id,
      },
    };
    body.query.bool.must.push(term);
  }
  //页面路径
  if (querys.page_url) {
    const term = {
      term: {
        pageUrl: querys.page_url,
      },
    };
    body.query.bool.must.push(term);
  }
  // 分页参数
  // if (querys.page && querys.size) {
  //   body.from = (querys.page - 1) * querys.size;
  //   body.size = querys.size;
  // }
  //排序规则
  // console.log(querys.sort);
  // if (querys.sort.length > 0 && querys.sort[0].split(",").length === 2) {
  //   const sortObj = querys.sort[0].split(",");
  //   const sort = {};
  //   sort[sortObj[0]] = { order: sortObj[1] };
  //   body.sort = [sort];
  // }
};

/**
 * 参数校验
 * @param querys
 * @returns 如果错误信息存在则表示参数校验失败
 */
export const valida = (querys: BaseQueryVo): string => {
  const msg = [];
  if (!querys.app_id) {
    msg.push("appid 不能为空");
  }
  if (!querys.main_type || !querys.sub_type) {
    msg.push("mainType和subType不能为空");
  }
  if (!querys.start_time || !querys.end_time) {
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
  body.size = 0;
  return body;
};

/**
 *基础指标统计
 * @param querys
 * @param timeName
 * @returns
 */
export const getPerformancesBasicindicatorsBody = (
  querys: BaseTotalVo,
  timeName: "startTime" | "errorTime"
) => {
  const body = getBaseBody(querys, timeName);
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
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
            field: timeName,
            interval: getTime(querys.granularity),
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

/**
 * 接口指标统计
 * @param querys
 * @param timeName
 * @returns
 */
export const getTotalinterfaceIndicator = (
  querys: InterfaceIndicatorTotalVo,
  timeName: "startTime" | "errorTime"
) => {
  const body = getBaseBody(querys, timeName);
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  if (querys.url) {
    body.query.bool.must.push({
      term: {
        url: querys.url,
      },
    });
  }
  const aggs = {
    count: {
      range: {
        field: "duration",
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
            field: timeName,
            interval: getTime(querys.granularity), // 一天
            min_doc_count: 0,
          },
          aggs: {
            avg: {
              avg: {
                field: "duration",
              },
            },
            userCount: {
              cardinality: {
                field: "userID",
              },
            },
            pageCount: {
              cardinality: {
                field: "pageUrl",
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

/**
 * 资源指标统计
 * @param querys
 * @param timeName
 * @returns
 */
export const getPerformancesResourceindicatorstatistics = (
  querys: BaseTotalVo,
  timeName: "startTime" | "errorTime"
) => {
  const body = getBaseBody(querys, timeName);
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  const aggs = {
    count: {
      histogram: {
        field: timeName,
        interval: getTime(querys.granularity),
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
        pageCount: {
          cardinality: {
            field: "pageUrl",
          },
        },
        count: {
          cardinality: {
            field: timeName,
          },
        },
      },
    },
  };

  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};

/**
 *资源错误统计
 * @param querys
 * @param timeName
 */
export const getTotalResourceerrorstatisticsBody = (
  querys: ResourceerrorTotalVo,
  timeName: "startTime" | "errorTime"
) => {
  const body = getBaseBody(querys, timeName);
  if (querys.url) {
    const term = {
      term: {
        path: querys.url,
      },
    };
    body.query.bool.must.push(term);
  }
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  const aggs = {
    count: {
      histogram: {
        field: timeName,
        interval: getTime(querys.granularity),
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
        pageCount: {
          cardinality: {
            field: "path",
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};

/**
 *接口错误查询
 * @param querys
 * @returns
 */
export const getInterfaceerrorsBody = (querys: InterfaceerrorsVo) => {
  const body = getBaseBody(querys, "startTime");
  if (querys.status_code) {
    const term = {
      term: {
        statusCode: querys.status_code,
      },
    };
    body.query.bool.must.push(term);
  }
  return body;
};

/**
 * 接口错误,统计
 * @param querys
 * @returns
 */
export const getTotalInterfaceerrorstatisticsBody = (
  querys: InterfaceerrorsTotalVo
) => {
  const body = getBaseBody(querys, "startTime");
  if (querys.status_code) {
    const term = {
      term: {
        statusCode: querys.status_code,
      },
    };
    body.query.bool.must.push(term);
  }
  if (querys.url) {
    const term = {
      term: {
        url: querys.url,
      },
    };
    body.query.bool.must.push(term);
  }
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  const aggs = {
    count: {
      histogram: {
        field: "startTime",
        interval: getTime(querys.granularity), // 一天
        min_doc_count: 0,
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};

/**
 *js 错误
 * @param querys
 * @returns
 */
export const getTotalErrorBody = (querys: JavaScriptErrorTotalVo) => {
  const body = getBaseBody(querys, "errorTime");
  if (querys.url) {
    const term = {
      term: {
        path: querys.url,
      },
    };
    body.query.bool.must.push(term);
  }
  if (querys.msg) {
    const term = {
      term: {
        msg: querys.msg,
      },
    };
    body.query.bool.must.push(term);
  }
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  const aggs = {
    count: {
      histogram: {
        field: "errorTime",
        interval: getTime(querys.granularity),
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};

/**
 * Promise错误
 * @param querys
 * @returns
 */
export const getTotalPromiseerrorBody = (querys: PromiseerrorTotalVo) => {
  const body = getBaseBody(querys, "errorTime");
  if (querys.stack) {
    const term = {
      term: {
        stack: querys.stack,
      },
    };
    body.query.bool.must.push(term);
  }
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  const aggs = {
    count: {
      histogram: {
        field: "errorTime",
        interval: getTime(querys.granularity),
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};

/**
 * vue错误
 * @param querys
 * @returns
 */
export const getTotalVuererrorBody = (querys: PromiseerrorTotalVo) => {
  const body = getBaseBody(querys, "errorTime");
  if (!querys.granularity) {
    querys.granularity = "1d";
  }
  const aggs = {
    count: {
      histogram: {
        field: "errorTime",
        interval: getTime(querys.granularity),
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};

/**
 * 基础行为统计
 * @param querys
 * @returns
 */
export const getTotalBasicBehaviorBody = (querys: BasicBehaviorTotalVo) => {
  const body = getBaseBody(querys, "startTime");
  const aggs = {
    count: {
      histogram: {
        field: "startTime",
        interval: getTime(querys.granularity),
      },
      aggs: {
        userCount: {
          cardinality: {
            field: "userID",
          },
        },
        avg: {
          avg: {
            field: "value",
          },
        },
      },
    },
  };
  body.aggs = aggs;
  body.size = 0; // 不查出列表数据,只返回聚合数据
  return body;
};
