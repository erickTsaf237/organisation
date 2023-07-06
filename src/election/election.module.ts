import {Module} from '@nestjs/common';
import {ElectionController} from './election.controller';
import {ElectionService} from './election.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Election, ElectionSchema} from "./schema/election.schema";
import {OrganisationModule} from "../organisation/organisation.module";
import {CandidatModule} from "../candidat/candidat.module";
import {CandidatService} from "../candidat/candidat.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Election.name, schema: ElectionSchema}]), OrganisationModule, Election],
    controllers: [ElectionController],
    exports: [ElectionService],
    providers: [ElectionService]
})
export class ElectionModule {
}
