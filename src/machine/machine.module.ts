import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Machine, MachineSchema} from "./schema/machine.schema";
import {ElecteurService} from "../electeur/electeur.service";
import {ElecteurModule} from "../electeur/electeur.module";
import {Electeur} from "../electeur/schema/electeur.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Machine.name, schema: MachineSchema}]), ElecteurModule],
  controllers: [MachineController],
  exports:[MachineService],
  providers: [MachineService, Electeur]
})
export class MachineModule {}
