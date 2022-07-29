import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

const jwtModule = JwtModule.register({
  secret: "test***REMOVED***",
  signOptions: { expiresIn: "2h" },
});

@Module({
  imports: [jwtModule],
  providers: [AuthService],
  exports: [jwtModule, AuthService],
})
export class AuthModule {}
