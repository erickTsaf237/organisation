import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Vote} from "./schema/vote.schema";

@Injectable()
export class VoteService {
    constructor(@InjectModel(Vote.name) private vote:typeof Model<Vote>) {
    }

    create(newObject: Vote) {
        const elec = new this.vote(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if(updatedObject.hasOwnProperty('_id'))
            return this.vote.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.vote.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.vote.findOne({_id:id}).exec()
    }

    getElectionVotes(id_organisation: string) {
        return this.vote.find({id_election:id_organisation}).exec();
    }
    getCandidatVote(id_organisation: string) {
        return this.vote.find({id_cadidat:id_organisation}).exec();
    }
    getBureauVote(id_organisation: string) {
        return this.vote.find({id_bureau:id_organisation}).exec();
    }

    getAll() {
        return this.vote.find().exec();
    }
}
