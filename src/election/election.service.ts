import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Election} from "./schema/election.schema";
import {Model} from "mongoose";
import {OrganisationService} from "../organisation/organisation.service";
import {CandidatService} from "../candidat/candidat.service";

@Injectable()
export class ElectionService {

    constructor(@InjectModel(Election.name) private election: typeof Model<Election>, private organisationService: OrganisationService) {
    }

    async create(newObject: Election) {

        const org = await this.organisationService.findOneByPK(newObject.id_organisation);
        console.log(org);
        if (org == null)
            throw TypeError('L\'organisation avec _id ' + newObject.id_organisation + 'n\'existe pas');
        const elec = new this.election(newObject);
        return elec.save();


    }

    update(updatedObject: any) {
        console.log(updatedObject)
        if (updatedObject.hasOwnProperty('_id'))
            return this.election.findOneAndUpdate({_id: updatedObject._id}, {'champElecteur': updatedObject.champElecteur}, {new: true})
        throw TypeError('Votre election doit contenir un _id')
    }
    updateVotingDates(updatedObject: any) {
        console.log(updatedObject)
        if (updatedObject.hasOwnProperty('_id') && updatedObject.hasOwnProperty('ending_voting_time') && updatedObject.hasOwnProperty('begining_voting_time') )
            return this.election.findOneAndUpdate({_id: updatedObject._id}, {'ending_voting_time': updatedObject.ending_voting_time, 'begining_voting_time':updatedObject.begining_voting_time}, {new: true})
        throw TypeError('Votre election doit contenir un _id, un ending_voting_time et un begining_voting_time')
    }

    update2(updatedObject: any) {
        console.log(updatedObject)
        if (updatedObject.hasOwnProperty('_id'))
            return this.election.findOneAndUpdate({_id: updatedObject._id}, {'champElecteur': updatedObject.champElecteur}, {new: true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.election.findOneAndDelete({_id: id})
    }

    getOne(id: string) {
        return this.election.findOne({_id: id}).exec()
    }

    getOrganistaionElections(id_organisation: string) {
        console.log(id_organisation)
        return this.election.find({id_organisation: id_organisation}).exec();
    }

    getAll() {
        return this.election.find().exec();
    }
}
