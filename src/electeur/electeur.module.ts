import { Module } from '@nestjs/common';
import { ElecteurController } from './electeur.controller';
import { ElecteurService } from './electeur.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Electeur, ElecteurSchema} from "./schema/electeur.schema";
import {ElectionModule} from "../election/election.module";

@Module({
  imports: [MongooseModule.forFeature([{name: Electeur.name, schema: ElecteurSchema}]), ElectionModule],
  controllers: [ElecteurController],
  exports: [ElecteurService],
  providers: [ElecteurService]
})
export class ElecteurModule {}
