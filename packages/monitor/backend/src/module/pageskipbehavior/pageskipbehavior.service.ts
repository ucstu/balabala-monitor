import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { pageskipbehaviorIndex } from "src/config/db.index";
import { PageSkipBehavior } from "src/entity/pageSkipBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { PageSkipBehaviorVo } from "src/vo/PageSkipBehavior.vo";
const SqlString = require("sqlstring");
@Injectable()
export class PageskipbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */

  async upLoadPageskipbehavior(
    pageSkipBehavior: PageSkipBehavior[]
  ): Promise<responseRust> {
    const body = [];
    pageSkipBehavior.forEach((e) => {
      body.push({ index: { _index: pageskipbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: pageskipbehaviorIndex,
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
  async queryPageskipbehavior(querys: PageSkipBehaviorVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    let sqlString = `
            SELECT from,count(from),to ,userID,pageUrl
            FROM "page_skip_behavior"
            where appId=? and mainType=? and subType=? and startTime between ? and ?
            group by from,to, userID,pageUrl
            order by count(from) desc
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
        from: item[0],
        count: item[1],
        to: item[2],
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
    return responseRust.success_data([...map.values()]);
  }
}
