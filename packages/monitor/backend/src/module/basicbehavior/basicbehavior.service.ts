import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicBehavior } from "src/entity/basicBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBasicBehaviorBody } from "src/utils/searchBody";
import { BaseQueryVo } from "src/vo/base.vo";
import { BasicBehaviorTotalVo, BasicBehaviorVo } from "src/vo/BasicBehavior.vo";
const SqlString = require("sqlstring");
/**
 * 基础行为
 */
@Injectable()
export class BasicbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * 上传数据
   */
  async upLoadBasicBehavior(basicbehavior: BasicBehavior[]) {
    const body = [];
    basicbehavior.forEach((e) => {
      body.push({ index: { _index: basicbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: basicbehaviorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    } else {
      return responseRust.error();
    }
  }

  /**
   * 查询数据
   */
  async queryBasicBehavior(querys: BasicBehaviorVo) {
    const body = getQueryBody(querys, "startTime");
    let size = querys.size ? querys.size : 10;
    if (!querys.size) {
      body.aggs = {
        allCount: {
          cardinality: {
            field: "pageUrl",
          },
        },
      };
      // 查询总条数
      const allCount = await this.elasticsearchService.search({
        index: basicbehaviorIndex,
        body,
      });
      if (allCount.statusCode !== 200) {
        return responseRust.error();
      }
      size =
        allCount.body.aggregations.allCount.value === 0
          ? size
          : allCount.body.aggregations.allCount.value;
    }
    body.aggs = {
      count: {
        terms: {
          field: "pageUrl",
          size: size,
        },
        aggs: {
          average: {
            avg: {
              field: "value",
            },
          },
          userCount: {
            cardinality: {
              field: "userID",
            },
          },
        },
      },
    };
    const res = await this.elasticsearchService.search({
      index: basicbehaviorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }

    const list = res.body.aggregations.count.buckets.map((item) => {
      return {
        pageUrl: item.key,
        count: item.doc_count,
        average: item.average.value,
        userCount: item.userCount.value,
        pageCount: item.doc_count,
      };
    });
    return responseRust.success_data(list);
  }

  /**
   * 统计数据
   */
  async totalBasicBehavior(
    querys: BasicBehaviorTotalVo
  ): Promise<responseRust> {
    const body = getTotalBasicBehaviorBody(querys);
    const res = await this.elasticsearchService.search({
      index: basicbehaviorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = this.totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }

  /**
   * 处理es 返回结果集
   * 填充日期
   * @param querys
   * @param list
   * @returns
   */
  private totalData(querys: BasicBehaviorTotalVo, list) {
    const restList = [];
    let timeFormat;
    if (querys.granularity === "1d") {
      timeFormat = "MM-DD";
      // 当月的第一天
      let startTime = dayjs(querys.start_time, "YYYY-MM-DD").startOf("month");
      const dayNum = dayjs(querys.start_time, "YYYY-MM-DD").daysInMonth();
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            dateTime: startTime.format(timeFormat),
            count: 0,
            average: 0,
          });
          startTime = startTime.add(1, "day");
        }
        return restList;
      }
      // 这个月开始的第一天
      const startMontyDay: number = startTime.date();
      // 结果集的第一天
      const startDay: number = dayjs(list[0].key).date();
      // 结果集的最后一天
      const endDay = dayjs(list[list.length - 1].key).date();

      for (let i = 0; i < startDay - startMontyDay; i++) {
        restList.unshift({
          dateTime: dayjs(list[0].key)
            .subtract(i + 1, "day")
            .format(timeFormat),
          count: 0,
          average: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          dateTime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          average: item.avg.value ? item.avg.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          dateTime: dayjs(list[list.length - 1].key)
            .add(1 + i, "day")
            .format(timeFormat),
          count: 0,
          average: 0,
        });
      }
    } else if (querys.granularity === "1h") {
      timeFormat = "HH:mm";
      // 当天
      let startTime = dayjs(querys.start_time, "YYYY-MM-DD").startOf("hour");
      const dayNum = 24;
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            dateTime: startTime.format(timeFormat),
            count: 0,
            average: 0,
          });
          startTime = startTime.add(1, "hour");
        }
        return restList;
      }
      // 这个天开始的第一天
      const startMontyDay: number = startTime.hour();
      // 结果集的第一天
      const startDay: number = dayjs(list[0].key).hour();
      // 结果集的最后一天
      const endDay = dayjs(list[list.length - 1].key).hour();

      for (let i = 0; i < startDay - startMontyDay; i++) {
        restList.unshift({
          dateTime: dayjs(list[0].key)
            .subtract(i + 1, "hour")
            .format(timeFormat),
          count: 0,
          average: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          dateTime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          average: item.avg.value ? item.avg.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          dateTime: dayjs(list[list.length - 1].key)
            .add(1 + i, "hour")
            .format(timeFormat),
          count: 0,
          average: 0,
        });
      }
    }
    return restList;
  }

  /**
   * 用户列表查询全部行为内容
   * @param querys
   * @returns
   */
  async getUserActionList(querys: BaseQueryVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    const args = [
      querys.app_id,
      querys.user_id,
      new Date(querys.start_time).getTime(),
      new Date(querys.end_time).getTime(),
    ];
    const res: Array<any> = await Promise.all([
      this.clickbehaviorsList(args),
      this.pageskipbehaviorsList(args),
      this.routingskipbehaviorsList(args),
      this.resourceerrorsList(args),
      this.javascripterrorsList(args),
      this.promiseerrorsList(args),
      this.interfaceerrorsList(args),
    ]);
    const list = res.flat(2);
    list.sort((data1: any, data2: any) => data1.time - data2.time);
    return responseRust.success_data(list);
  }

  /**
   * 点击行为
   * @param args
   * @returns
   */
  private clickbehaviorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,startTime,pageUrl,userID,top,"left" ,"inner",target,mainType,subType
      FROM "click_behavior"
      where appId= ? and userID = ? and startTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                title: "点击行为",
                listType: 4,
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                top: item[4],
                left: item[5],
                inner: item[6],
                target: item[7],
                mainType: item[8],
                subType: item[9],
              };
            });
            resolve(list);
          }
        });
    });
  }

  /**
   * 页面跳转行为
   * @param args
   * @returns
   */
  private pageskipbehaviorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,startTime,pageUrl,userID,"from" ,"to",mainType,subType
      FROM "page_skip_behavior"
      where appId= ? and userID = ? and startTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                title: "浏览",
                listType: 5,
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                from: item[4],
                to: item[5],
                mainType: item[6],
                subType: item[7],
              };
            });
            resolve(list);
          }
        });
    });
  }

  /**
   * 路由跳转行为
   * @param args
   * @returns
   */
  private routingskipbehaviorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,startTime,pageUrl,userID,"from" ,"to","params","query",mainType,subType
      FROM "routing_skip_behavior"
      where appId= ? and userID = ? and startTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                title: "浏览",
                listType: 6,
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                from: item[4],
                to: item[5],
                params: item[6],
                query: item[7],
                mainType: item[8],
                subType: item[9],
              };
            });
            resolve(list);
          }
        });
    });
  }

  /**
   * 资源错误
   * @param args
   * @returns
   */
  private resourceerrorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,errorTime,pageUrl,userID,"resourceType" ,"path",mainType,subType
      FROM "resource_error"
      where appId= ? and userID = ? and errorTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                listType: 2,
                title: "资源错误",
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                resourceType: item[4],
                path: item[5],
                mainType: item[6],
                subType: item[7],
              };
            });
            resolve(list);
          }
        });
    });
  }

  /**
   * js错误
   * @param args
   * @returns
   */
  private javascripterrorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,errorTime,pageUrl,userID,"msg" ,"line","column","stack","url",mainType,subType
      FROM "javascript_error"
      where appId= ? and userID = ? and errorTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                listType: 2,
                title: "js错误",
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                msg: item[4],
                line: item[5],
                column: item[6],
                stack: item[7],
                url: item[8],
                mainType: item[9],
                subType: item[10],
              };
            });
            resolve(list);
          }
        });
    });
  }

  /**
   * promise错误
   * @param args
   * @returns
   */
  private promiseerrorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,errorTime,pageUrl,userID,"stack",mainType,subType
      FROM "promise_error"
      where appId= ? and userID = ? and errorTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                listType: 2,
                title: "promise错误",
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                stack: item[4],
                mainType: item[5],
                subType: item[6],
              };
            });
            resolve(list);
          }
        });
    });
  }

  /**
   * 接口
   * @param args
   * @returns
   */
  private interfaceerrorsList(args) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT appId,startTime,pageUrl,userID,"statusCode","method","duration","url",mainType,subType
      FROM "interface_indicator"
      where appId= ? and userID = ?  and startTime between ? and ? `;
      sql = SqlString.format(sql, args);
      this.elasticsearchService.sql
        .query({
          body: {
            query: sql,
          },
        })
        .then((res) => {
          if (res.statusCode !== 200) {
            reject(res);
          } else {
            const list = res.body.rows.map((item) => {
              return {
                listType: 2,
                title: "接口",
                appId: item[0],
                time: item[1],
                pageUrl: item[2],
                userID: item[3],
                statusCode: item[4],
                method: item[5],
                duration: item[6],
                url: item[7],
                mainType: item[8],
                subType: item[9],
              };
            });
            resolve(list);
          }
        });
    });
  }
}
