import { Module } from '@nestjs/common';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Organisation, OrganisationSchema} from "./schema/organisation.schema";

@Module({
  imports:[MongooseModule.forFeature([{name: Organisation.name, schema: OrganisationSchema}])],
  controllers: [OrganisationController],
  exports: [OrganisationService],
  providers: [OrganisationService],
})
export class OrganisationModule {}
