import { Global, Module } from "@nestjs/common";

import { ElasticsearchModule } from "@nestjs/elasticsearch";

//node: "http://139.155.90.228:9200",
@Global()
@Module({
  imports: [
    ElasticsearchModule.register({ node: "http://139.155.90.228:9200" }),
  ],
  exports: [ElasticsearchModule],
})
export class EsConfigModule {}
