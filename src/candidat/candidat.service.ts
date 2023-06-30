import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {Election} from "../election/schema/election.schema";
import {Model} from "mongoose";
import {Candidat} from "./schema/candidat.schema";
import {ElectionService} from "../election/election.service";

@Injectable()
export class CandidatService {
    constructor(@InjectModel(Candidat.name) private candidat:typeof Model<Candidat>,
                private electionService: ElectionService
                ) {
    }

    create(newObject: Candidat) {
        const elec = this.electionService.getOne(newObject.id_election);
        if (elec == null){
            throw TypeError('L\'election identifier par '+newObject.id_election +' n\'existe pas !!');
        }
        const can = new this.candidat(newObject);
        return can.save();
    }

    update(updatedObject: any) {
        if('_id' in updatedObject && updatedObject._id !== undefined)
            return this.candidat.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre candaidat doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.candidat.findOneAndDelete({_id:id})
    }

    deleteManyByParen(id: string) {
        this.candidat.deleteMany({id_election:id})
        return true
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


