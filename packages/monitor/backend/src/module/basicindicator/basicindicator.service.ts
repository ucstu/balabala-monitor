import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { BasicIndicator } from "src/entity/basicIndicator.entity";

@Injectable()
export class BasicindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  private basicindicatorLoad(basicIndicator: BasicIndicator) {}
}
