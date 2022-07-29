import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Account } from "src/entity/account.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([Account]), AuthModule],
})
export class UserModule {}
