import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BasicindicatorModule } from "./basicindicator/basicindicator.module";
import { EsConfigModule } from "./config/es.module";
import { InterfaceindicatorModule } from "./interfaceindicator/interfaceindicator.module";
import { JavascripterrorModule } from "./javascripterror/javascripterror.module";
import { PromiseerrorModule } from "./promiseerror/promiseerror.module";
import { ResourceerrorModule } from "./resourceerror/resourceerror.module";
import { ResourceindicatorModule } from "./resourceindicator/resourceindicator.module";
import { VueerrorModule } from "./vueerror/vueerror.module";
import { BasicbehaviorModule } from "./basicbehavior/basicbehavior.module";
import { ClickbehaviorModule } from "./clickbehavior/clickbehavior.module";
import { PageskipbehaviorModule } from "./pageskipbehavior/pageskipbehavior.module";
import { RoutingskipbehaviorModule } from "./routingskipbehavior/routingskipbehavior.module";

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
