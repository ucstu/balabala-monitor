import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";

@Injectable()
export class BasicindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   * @param basicIndicator
   * @returns
   */
  async upLoadBasicindicator(
    basicIndicator: BasicIndicator
  ): Promise<responseRust> {
    const res = await this.elasticsearchService.index({
      index: basicbehaviorIndex,
      body: basicIndicator,
    });
    if (res.statusCode === 201) {
      return responseRust.success_creat();
    } else {
      return responseRust.error();
    }
  }

  /**
   * 查询数据
   *
   */
}
