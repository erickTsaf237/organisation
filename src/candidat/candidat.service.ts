import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Election} from "../election/schema/election.schema";
import {Model} from "mongoose";
import {Candidat} from "./schema/candidat.schema";

@Injectable()
export class CandidatService {
    constructor(@InjectModel(Candidat.name) private candidat:typeof Model<Candidat>) {
    }

    create(newObject: Candidat) {
        const elec = new this.candidat(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if(updatedObject.hasOwnProperty('_id'))
            return this.candidat.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.candidat.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.candidat.findOne({_id:id}).exec()
    }

    getElectionsCandidat(id_election: string) {
        return this.candidat.find({id_election:id_election}).exec();
    }

    getAll() {
        return this.candidat.find().populate('id_election').exec();
    }
}


