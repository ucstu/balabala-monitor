import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { resourceerrorIndex } from "src/config/db.index";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import { getTotalResourceerrorstatisticsBody } from "src/utils/searchBody";
import { ResourceerrorTotalVo, ResourceerrorVo } from "src/vo/resourceerror.vo";
const SqlString = require("sqlstring");
@Injectable()
export class ResourceerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * 上报数据
   * @param resourceError
   * @returns
   */
  async uploadError(resourceError: ResourceError[]): Promise<responseRust> {
    const body = [];
    resourceError.forEach((e) => {
      body.push({ index: { _index: resourceerrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk<ResourceError>({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败,原因:" + JSON.stringify(res));
  }

  /**
   * 列表查询
   * @param querys
   * @returns
   */
  async getErrorList(querys: ResourceerrorVo) {
    if (querys.start_time.length === 10) {
      querys.start_time = querys.start_time + " 00:00:00";
      querys.end_time = querys.end_time + " 00:00:00";
    }
    // sql 语句
    const sqlString = `
            SELECT path,count(path) ,userID,pageUrl
            FROM "resource_error"
            where appId=? and mainType=? and subType=? and errorTime between ? and ?
            group by path, userID,pageUrl
            order by count(path) desc
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
        path: item[0],
        count: item[1],
        userCount: 1,
        pageCount: 1,
        userID: [item[2]],
        pageList: [item[3]],
        average: 0,
      };
      const key = `${item[0]}`;
      if (map.has(key)) {
        const mapItem = map.get(key);
        if (!mapItem.userID.includes(value.userID[0])) {
          mapItem.userCount++;
          mapItem.userID.push(value.userID[0]);
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
   * 统计
   * @param querys
   * @returns
   */
  async totalResourceerrorstatistics(
    querys: ResourceerrorTotalVo
  ): Promise<responseRust> {
    const body = getTotalResourceerrorstatisticsBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
}
