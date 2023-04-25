import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./model/user.model";
import * as UserMongo from "./shemas/users.shema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [SequelizeModule.forFeature([User]),
      MongooseModule.forFeature([{name: UserMongo.User.name, schema: UserMongo.UserSchema}])
  ],
  controllers: [UserController],
  exports: [SequelizeModule, UserService],
  providers: [UserService],
})
export class UserModule {}
