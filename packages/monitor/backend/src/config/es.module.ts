import { Global, Module } from "@nestjs/common";

import { ElasticsearchModule } from "@nestjs/elasticsearch";

//node: "***REMOVED***",
@Global()
@Module({
  imports: [
    ElasticsearchModule.register({ node: "***REMOVED***" }),
  ],
  exports: [ElasticsearchModule],
})
export class EsConfigModule {}
