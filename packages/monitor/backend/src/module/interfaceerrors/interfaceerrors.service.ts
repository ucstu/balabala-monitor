import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { interfacindicatorIndex } from "src/config/db.index";
import { InterfaceIndicator } from "src/entity/interfaceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { getInterfaceerrorsBody } from "src/utils/searchBody";
import { BaseTotalVo } from "src/vo/base.vo";
import { InterfaceerrorsVo } from "src/vo/interfaceerrors.vo";

@Injectable()
export class InterfaceerrorsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getInterfaceerrors(querys: InterfaceerrorsVo) {
    const body = getInterfaceerrorsBody(querys);
    const res = await this.elasticsearchService.search({
      index: interfacindicatorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      itmes: [],
      totalCount: 0,
    };
    const list: InterfaceIndicator[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: InterfaceIndicator = element._source;
      list.push(source);
    });
    rest.itmes = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }

  async totalInterfaceerrorstatistics(querys: BaseTotalVo) {
    throw new Error("Method not implemented.");
  }

  totalData(list) {
    throw new Error("Method not implemented.");
  }
}
