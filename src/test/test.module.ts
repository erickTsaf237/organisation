import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Test, TestSchema} from "./schema/test.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Test.name, schema: TestSchema}])],
  controllers: [TestController],
  exports:[TestService],
  providers: [TestService]
})
export class TestModule {}
