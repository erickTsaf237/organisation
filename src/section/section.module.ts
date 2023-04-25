import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Section, SectionSchena} from "./schema/section.shema";
import {SectionController} from "./section.controller";

@Module({
  imports:[MongooseModule.forFeature([{name: Section.name, schema: SectionSchena}])],
  controllers: [SectionController],
  exports: [SectionService],
  providers: [SectionService]
})
export class SectionModule {}
