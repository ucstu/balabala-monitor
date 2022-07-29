import { Body, Controller, Param, Post } from "@nestjs/common";
import { Account } from "src/entity/account.entity";
import { UserService } from "./user.service";

@Controller("accounts")
export class UserController {
  constructor(private userservice: UserService) {}

  @Post()
  insert(@Body() account: Account) {
    const rest = this.userservice.insert(account);
    return rest;
  }
}
