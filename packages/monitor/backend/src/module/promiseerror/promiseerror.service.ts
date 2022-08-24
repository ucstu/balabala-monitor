import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { promiseerrorIndex } from "src/config/db.index";
import { PromiseError } from "src/entity/promiseError.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import { getTotalPromiseerrorBody } from "src/utils/searchBody";
import { PromiseerrorTotalVo, PromiseerrorVo } from "src/vo/promiseerror.vo";
const SqlString = require("sqlstring");
@Injectable()
export class PromiseerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * promise 错误数据上报
   * @param promiseError
   * @returns
   */
  async uploadError(promiseError: PromiseError[]) {
    const body = [];
    promiseError.forEach((e) => {
      body.push({ index: { _index: promiseerrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: promiseerrorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败,原因:" + JSON.stringify(res));
  }

  /**
   * promise 错误 列表查询
   * @param querys
   * @returns
   */
  async getErrorList(querys: PromiseerrorVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    const sqlString = `
            SELECT stack,count(stack) ,userID,pageUrl
            FROM "promise_error"
            where appId=? and mainType=? and subType=? and errorTime between ? and ?
            group by stack, userID,pageUrl
            order by count(stack) desc
        `;
    // sql 参数
    const sqlArges = [
      querys.app_id,
      querys.main_type,
      querys.sub_type,
      new Date(querys.start_time).getTime(),
      new Date(querys.end_time).getTime(),
    ];
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
        stack: item[0],
        count: item[1],
        userCount: 1,
        pageCount: 1,
        userList: [item[2]],
        pageList: [item[3]],
        average: 0,
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

    // 是否要限制返回条数
    let list = [...map.values()];
    if (querys.size) {
      list = list.slice(0, parseInt(querys.size + ""));
    }
    return responseRust.success_data(list);
  }

  /**
   * promise 错误统计
   * @param querys
   * @returns
   */
  async totalPromiseerror(querys: PromiseerrorTotalVo) {
    const body = getTotalPromiseerrorBody(querys);
    const res = await this.elasticsearchService.search({
      index: promiseerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
}
