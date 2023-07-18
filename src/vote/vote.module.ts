import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Vote, VoteSchema} from "./schema/vote.schema";
import {ElecteurModule} from "../electeur/electeur.module";
import {MachineModule} from "../machine/machine.module";
import {Electeur, ElecteurSchema} from "../electeur/schema/electeur.schema";
import {Machine, MachineSchema} from "../machine/schema/machine.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Vote.name, schema: VoteSchema}]), ElecteurModule,
    MachineModule,MongooseModule.forFeature([{name:Machine.name, schema: MachineSchema}]),
    MongooseModule.forFeature([{name: Electeur.name, schema: ElecteurSchema}])],
  controllers: [VoteController],
  exports:[VoteService],
  providers: [VoteService]
})
export class VoteModule {}
