import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Bureau} from "./schema/bureau.schema";

@Injectable()
export class BureauService {

    constructor(@InjectModel(Bureau.name) private bureau:typeof Model<Bureau>) {
    }

    async create(newObject: Bureau) {
        const u = await this.bureau.findOne({
            id_responsable: newObject.id_responsable,
            id_election: newObject.id_election
        });
        if (u != null)
            throw TypeError('cet employe employe est deja responsable d\'un bureau');
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
        return this.bureau.find({id_section:id_election}).exec();
    }

    getAll() {
        return this.bureau.find().exec();
    }

    async employeIsFree(id_election: string, id_responsable: string) {
        const u = await this.bureau.findOne({
            id_responsable: id_responsable,
            id_election: id_election
        }).exec();
        return u == null;
    }
    async getAllByElectionSection(id_election: string, id_section: string) {
        const u = await this.bureau.find({
            id_section: id_section,
            id_election: id_election
        }).exec();
        console.log(u);
        return u;
    }
}
