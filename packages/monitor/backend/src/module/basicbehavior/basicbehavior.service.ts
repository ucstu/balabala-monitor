import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicBehavior } from "src/entity/basicBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import { getTotalBasicBehaviorBody } from "src/utils/searchBody";
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
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    let sqlString = `
            SELECT pageUrl,count(pageUrl),userID,sum(value)
            FROM "basic_behavior"
            where appId=? and mainType=? and subType=? and startTime between ? and ?
            group by pageUrl ,userID
            order by count(pageUrl) desc
        `;
    // sql 参数
    const sqlArges = [
      querys.app_id,
      querys.main_type,
      querys.sub_type,
      new Date(querys.start_time).getTime(),
      new Date(querys.end_time).getTime(),
    ];
    // 是否要限制返回条数
    if (querys.size) {
      sqlString += " limit ?";
      sqlArges.push(parseInt(querys.size + ""));
    }
    const sql = SqlString.format(sqlString, sqlArges);
    const rest = await this.elasticsearchService.sql.query({
      body: {
        query: sql,
      },
    });
    if (rest.statusCode !== 200) {
      return responseRust.error();
    }
    const map = new Map();
    rest.body.rows.forEach((item) => {
      const value = {
        pageUrl: item[0],
        count: item[1],
        userCount: 1,
        pageCount: 1,
        userList: [item[2]],
        pageList: [item[0]],
        average: 0,
        sumAverage: item[3],
      };
      const key = `${item[0]}`;
      if (map.has(key)) {
        const mapItem = map.get(key);
        if (!mapItem.userList.includes(value.userList[0])) {
          mapItem.userCount++;
          mapItem.userList.push(value.userList[0]);
        }
        if (!mapItem.pageList.includes(value.pageList[0])) {
          mapItem.pageCount++;
          mapItem.pageList.push(value.pageList[0]);
        }
        map.get(key).count += value.count;
      } else {
        map.set(key, value);
      }
    });
    for (const value of map.values()) {
      if (value.sumAverage !== 0.0) {
        value.average = value.sumAverage / value.count;
      }
      delete value.sumAverage;
    }
    return responseRust.success_data([...map.values()]);
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
    const list = totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
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
      SELECT appId,startTime,pageUrl,userID,top,'left' ,'inner',target,mainType,subType
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
                listType: 1,
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
      SELECT appId,startTime,pageUrl,userID,'from' ,'to',mainType,subType
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
                listType: 1,
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
      SELECT appId,startTime,pageUrl,userID,'from' ,'to',params,query,mainType,subType
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
                listType: 1,
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
      SELECT appId,errorTime,pageUrl,userID,resourceType ,path,mainType,subType
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
      SELECT appId,errorTime,pageUrl,userID,msg ,line,column,stack,url,mainType,subType
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
      SELECT appId,errorTime,pageUrl,userID,stack,mainType,subType
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
      SELECT appId,startTime,pageUrl,userID,statusCode,method,duration,url,mainType,subType
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
                listType: 3,
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
