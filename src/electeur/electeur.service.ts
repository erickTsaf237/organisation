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
        const electeur = await this.getOneByIdAndCNINumber(newObject.numero_de_cni, newObject.id_election);
        if ((electeur == true)) {
            const elec = new this.electeur(newObject);
            return elec.save();
        }
        throw Error('cet Electeur est deja present');
    }

    async getOneByIdAndCNINumber(cni: string, electionId) {
        const elec = await this.electeur.findOne({numero_de_cni: cni, id_election: electionId});
        console.log(elec);
        if (elec != null){
            return elec;
        }
        return true;
    }

    putPhoto_electeur(updatedObject: Electeur, id: string) {
        return this.electeur.findOneAndUpdate({_id:id}, {'photo_electeur':updatedObject.photo_electeur,}, {new:true})
    }

    putPhoto_cni_avant(updatedObject: Electeur, id: string) {
        return this.electeur.findOneAndUpdate({_id:id}, {'photo_cni_avant':updatedObject.photo_cni_avant,}, {new:true})
    }

    putPhoto_cni_arriere(updatedObject: Electeur, id: string) {
        return this.electeur.findOneAndUpdate({_id:id}, {'photo_cni_arriere':updatedObject.photo_cni_arriere,}, {new:true})
    }
}
