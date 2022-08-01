import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EsConfigModule } from "./config/es.module";
import { BasicbehaviorModule } from "./module/basicbehavior/basicbehavior.module";
import { BasicindicatorModule } from "./module/basicindicator/basicindicator.module";
import { ClickbehaviorModule } from "./module/clickbehavior/clickbehavior.module";
import { InterfaceindicatorModule } from "./module/interfaceindicator/interfaceindicator.module";
import { JavascripterrorModule } from "./module/javascripterror/javascripterror.module";
import { PageskipbehaviorModule } from "./module/pageskipbehavior/pageskipbehavior.module";
import { PromiseerrorModule } from "./module/promiseerror/promiseerror.module";
import { ResourceerrorModule } from "./module/resourceerror/resourceerror.module";
import { ResourceindicatorModule } from "./module/resourceindicator/resourceindicator.module";
import { RoutingskipbehaviorModule } from "./module/routingskipbehavior/routingskipbehavior.module";
import { VueerrorModule } from "./module/vueerror/vueerror.module";

@Module({
  imports: [
    EsConfigModule,
    BasicindicatorModule,
    InterfaceindicatorModule,
    ResourceindicatorModule,
    ResourceerrorModule,
    JavascripterrorModule,
    PromiseerrorModule,
    VueerrorModule,
    BasicbehaviorModule,
    ClickbehaviorModule,
    PageskipbehaviorModule,
    RoutingskipbehaviorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
