import { Module } from '@nestjs/common';
import { BureauController } from './bureau.controller';
import { BureauService } from './bureau.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Bureau, BureauSchema} from "./schema/bureau.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Bureau.name, schema:BureauSchema}])],
  controllers: [BureauController],
  exports: [BureauService],
  providers: [BureauService]
})
export class BureauModule {}
