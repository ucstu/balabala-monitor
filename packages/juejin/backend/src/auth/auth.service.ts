import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken";
import { Account } from "src/entity/account.entity";
import { Payload } from "src/entity/payload";
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * 生成 jwt
   * @param user Account 对象
   * @returns jwt
   */
  generateToken(user: Account): string {
    // 载荷
    const payload: Payload = {
      name: user.name,
      id: user.id,
      phone: user.phone,
    };
    const tokne = this.jwtService.sign(payload);
    return tokne;
  }
  /**
   *
   * @param token  请求头token
   * @returns 校验成功返回 载荷体 Payload,校验失败返回false
   */
  validate(token: string): boolean | Payload {
    try {
      const result:Payload = this.jwtService.verify(token);
      return result;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        //  token 已过期
        console.error("token 已过期");
      } else if (error instanceof jwt.JsonWebTokenError) {
        //  无效 token
        console.error("无效token");
      }
      return false;
    }
  }
}
