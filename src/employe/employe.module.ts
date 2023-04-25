import { Module } from '@nestjs/common';
import { EmployeController } from './employe.controller';
import { EmployeService } from './employe.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Employe, EmployeSchema} from "./schema/employe.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Employe.name, schema: EmployeSchema}])],
  controllers: [EmployeController],
  exports:[EmployeService],
  providers: [EmployeService]
})
export class EmployeModule {


}
