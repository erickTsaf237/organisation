import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {EmployeModule} from "../employe/employe.module";

@Module({
  imports: [UserModule, EmployeModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1000s' },
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
