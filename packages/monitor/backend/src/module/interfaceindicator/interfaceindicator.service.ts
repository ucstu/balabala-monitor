import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { interfacindicatorIndex } from "src/config/db.index";
import { InterfaceIndicator } from "src/entity/interfaceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
import {
  InterfaceIndicatorTotalVo,
  InterfaceIndicatorVo,
} from "src/vo/interfaceIndicator.vo";

@Injectable()
export class InterfaceindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   *上传数据
   * @param interfaceIndicator
   * @returns
   */
  async upLoadInterfaceindicator(interfaceIndicator: InterfaceIndicator[]) {
    const body = [];
    interfaceIndicator.forEach((e) => {
      body.push({ index: { _index: interfacindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: interfacindicatorIndex,
      body,
    });
    if (res.statusCode === 201) {
      return responseRust.success_creat();
    } else {
      return responseRust.error();
    }
  }

  /**
   * 查询数据
   */
  async queryInterfaceindicator(querys: InterfaceIndicatorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: interfacindicatorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }

    const list: InterfaceIndicator[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: InterfaceIndicator = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }

  /**
   * 统计数据
   */

  async totalinterfaceIndicator(querys: InterfaceIndicatorTotalVo) {
    const body = getTotalBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: interfacindicatorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = [];
    res.body.aggregations.count.buckets.forEach((element) => {
      list.push({
        datetime: format(new Date(element.key)),
        count: element.doc_count,
      });
    });
    return responseRust.success_data(res);
  }
}
