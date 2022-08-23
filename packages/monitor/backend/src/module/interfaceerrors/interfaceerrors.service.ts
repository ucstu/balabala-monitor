import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { interfacindicatorIndex } from "src/config/db.index";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import { getTotalInterfaceerrorstatisticsBody } from "src/utils/searchBody";
import {
  InterfaceerrorsTotalVo,
  InterfaceerrorsVo,
} from "src/vo/interfaceerrors.vo";
const SqlString = require("sqlstring");
@Injectable()
export class InterfaceerrorsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   *接口错误查询
   * @param querys
   * @returns
   */
  async getInterfaceerrors(querys: InterfaceerrorsVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    let sqlString = `
            SELECT url,count(url),userID,pageUrl,sum(duration)
            FROM "interface_indicator"
            where appId=? and mainType=? and subType=? and startTime between ? and ?
            group by url ,userID,pageUrl
            order by count(url) desc
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
        url: item[0],
        count: item[1],
        userCount: 1,
        pageCount: 1,
        userList: [item[2]],
        pageList: [item[3]],
        average: 0,
        sumAverage: item[4],
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
   * 接口错误统计
   * @param querys
   * @returns
   */
  async totalInterfaceerrorstatistics(querys: InterfaceerrorsTotalVo) {
    const body = getTotalInterfaceerrorstatisticsBody(querys);
    const res = await this.elasticsearchService.search({
      index: interfacindicatorIndex,
      body,
    });
    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = [];
    res.body.aggregations.count.buckets.forEach((e) => {
      const tempList = totalData(querys, e.list.buckets);
      list.push(tempList);
    });
    return responseRust.success_data(list);
  }
}
