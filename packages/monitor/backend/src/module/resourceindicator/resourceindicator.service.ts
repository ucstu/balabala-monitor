import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { resourceindicatorIndex } from "src/config/db.index";
import { ResourceIndicator } from "src/entity/resourceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import { getPerformancesResourceindicatorstatistics } from "src/utils/searchBody";
import {
  ResourceIndicatorTotalVo,
  ResourceIndicatorVo,
} from "src/vo/resourceIndicator.vo";
const SqlString = require("sqlstring");
@Injectable()
export class ResourceindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */
  async upLoadResourceIndicator(resourceIndicator: ResourceIndicator[]) {
    const body = [];
    resourceIndicator.forEach((e) => {
      body.push({ index: { _index: resourceindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: resourceindicatorIndex,
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

  async queryResourceIndicator(querys: ResourceIndicatorVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    const sqlString = `
            SELECT url,count(url),userID,pageUrl,sum(duration)
            FROM "resource_indicator"
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
   * 统计数据
   */
  async totalinterfaceIndicator(querys: ResourceIndicatorTotalVo) {
    const body = getPerformancesResourceindicatorstatistics(
      querys,
      "startTime"
    );
    const res = await this.elasticsearchService.search({
      index: resourceindicatorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
}
