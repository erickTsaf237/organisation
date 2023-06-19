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
        const electeur = this.getOneByIdAndCNINumber(newObject.cni, newObject.id_election);
        if (electeur instanceof Boolean) {
            const elec = new this.electeur(newObject);
            return elec.save();
        }
        throw Error('cet Electeur est deja present');

    }

    async getOneByIdAndCNINumber(cni: string, electionId) {
        const elec = await this.electeur.findOne({cni: cni, id_election: electionId});
        if (elec._id != null){
            return elec;
        }
        return true;
    }
}
