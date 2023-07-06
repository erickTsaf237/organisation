import { Module } from '@nestjs/common';
import { CandidatController } from './candidat.controller';
import { CandidatService } from './candidat.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Candidat, CandidatSchema} from "./schema/candidat.schema";
import {ElectionModule} from "../election/election.module";

@Module({
  imports:[MongooseModule.forFeature([{name:Candidat.name, schema:CandidatSchema}]), ElectionModule,
  ],
  controllers: [CandidatController],
  exports:[CandidatService],
  providers: [CandidatService]
})
export class CandidatModule {}
