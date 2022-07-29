import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth/auth.service";
//守卫

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    // request 中可以有token
    const request = context.switchToHttp().getRequest();
    const user = request.headers;

    //拿到了用户表示，查询数据库查看是否拥有查询
    if (this.authService.validate(user.token) == null) {
      return false;
    }

    return true;
  }
}
