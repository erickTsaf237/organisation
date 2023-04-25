import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Bureau} from "./schema/bureau.schema";

@Injectable()
export class BureauService {

    constructor(@InjectModel(Bureau.name) private bureau:typeof Model<Bureau>) {
    }

    create(newObject: Bureau) {
        const elec = new this.bureau(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if(updatedObject.hasOwnProperty('_id'))
            return this.bureau.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.bureau.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.bureau.findOne({_id:id}).exec()
    }

    getElectionsBureaux(id_election: string) {
        return this.bureau.find({id_election:id_election}).exec();
    }

    getAll() {
        return this.bureau.find().exec();
    }
}
