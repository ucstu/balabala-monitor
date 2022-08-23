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
    // sql 参数
    const sqlArges = [
      querys.app_id,
      querys.main_type,
      querys.sub_type,
      new Date(querys.start_time).getTime(),
      new Date(querys.end_time).getTime(),
    ];
    // sql 语句
    let sqlString = `SELECT url,count(url),userID,pageUrl,sum(duration) FROM "interface_indicator" `;
    // where 条件
    let where =
      "where appId=? and mainType=? and subType=? and startTime between ? and ? ";
    if (querys.status_code) {
      where = where.concat("and statusCode=? ");
      sqlArges.push(querys.status_code);
    }
    // 分组
    const group = "group by url ,userID,pageUrl ";
    // 排序
    const order = "order by count(url) desc ";
    // 组装最终sql 语句 字符串
    sqlString = sqlString + where + group + order;
    // 防止sql 注入
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
    // 是否要限制返回条数
    let list = [...map.values()];
    if (querys.size) {
      list = list.slice(0, parseInt(querys.size + ""));
    }
    return responseRust.success_data(list);
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
    const list = totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
}
