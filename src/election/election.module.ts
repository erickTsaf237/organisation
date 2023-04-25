import { Module } from '@nestjs/common';
import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Election, ElectionSchema} from "./schema/election.schema";

@Module({
  imports:[MongooseModule.forFeature([{name: Election.name, schema: ElectionSchema}])],
  controllers: [ElectionController],
  exports:[ElectionService],
  providers: [ElectionService]
})
export class ElectionModule {}
