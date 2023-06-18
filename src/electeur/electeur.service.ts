import { Injectable } from '@nestjs/common';
import {Electeur} from "./schema/electeur.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Election} from "../election/schema/election.schema";
import {Model} from "mongoose";
import {OrganisationService} from "../organisation/organisation.service";

@Injectable()
export class ElecteurService {


    constructor(@InjectModel(Electeur.name) private electeur:typeof Model<Electeur>) {

    }

    async create(newObject: Electeur) {
        const elec = new this.electeur(newObject);
        return elec.save();
    }
}
