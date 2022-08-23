import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { clickbehaviorIndex } from "src/config/db.index";
import { ClickBehavior } from "src/entity/clickBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { ClickBehaviorVo } from "src/vo/ClickBehavior.vo";
const SqlString = require("sqlstring");
@Injectable()
export class ClickbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */

  async upLoadClickBehavior(
    clickBehavior: ClickBehavior[]
  ): Promise<responseRust> {
    const body = [];
    clickBehavior.forEach((e) => {
      body.push({ index: { _index: clickbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: clickbehaviorIndex,
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
  async queryClickBehavior(querys: ClickBehaviorVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    const sqlString = `
            SELECT target,count(target),inner ,userID,pageUrl
            FROM "click_behavior"
            where appId=? and mainType=? and subType=? and startTime between ? and ?
            group by target,inner, userID,pageUrl
            order by count(target) desc
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
        target: item[0],
        count: item[1],
        inner: item[2],
        userCount: 1,
        pageCount: 1,
        userID: [item[3]],
        pageUrl: [item[4]],
        average: 0,
      };
      const key = `${item[0]}${item[2]}`;
      if (map.has(key)) {
        const mapItem = map.get(key);
        if (!mapItem.userID.includes(value.userID[0])) {
          mapItem.userCount++;
          mapItem.userID.push(value.userID[0]);
        }
        if (!mapItem.pageUrl.includes(value.pageUrl[0])) {
          mapItem.pageCount++;
          mapItem.pageUrl.push(value.pageUrl[0]);
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
}
