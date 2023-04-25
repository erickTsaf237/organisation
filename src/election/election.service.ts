import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Election} from "./schema/election.schema";
import {Model} from "mongoose";

@Injectable()
export class ElectionService {

    constructor(@InjectModel(Election.name) private election:typeof Model<Election>) {
    }

    create(newObject: Election) {
        const elec = new this.election(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if(updatedObject.hasOwnProperty('_id'))
            return this.election.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.election.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.election.findOne({_id:id}).exec()
    }

    getOrganistaionElections(id_organisation: string) {
        return this.election.find({id_organisation:id_organisation}).exec();
    }

    getAll() {
        return this.election.find().exec();
    }
}
