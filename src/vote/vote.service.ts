import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Vote} from "./schema/vote.schema";
import {ElecteurService} from "../electeur/electeur.service";
import {MachineService} from "../machine/machine.service";
import {Electeur} from "../electeur/schema/electeur.schema";
import {Machine} from "../machine/schema/machine.schema";
import {error} from "winston";

@Injectable()
export class VoteService {
    constructor(@InjectModel(Vote.name) private vote: typeof Model<Vote>,
                @InjectModel(Electeur.name) private electeur: typeof Model<Electeur>,
                @InjectModel(Machine.name) private machine: typeof Model<Machine>,
                ) {
    }

    async create(newObject: Vote) {
        // const elec =  new this.vote(newObject);
        const session = await this.vote.db.startSession();
        session.startTransaction();
        try {
            const a = await this.machine.findOneAndUpdate({_id:newObject.id_machine, },{id_electeur:null},{new:false})
            if(a == undefined){
                throw error;
            }
            console.log('////////////////////// la valeur de a:', a);
            const  c =await this.electeur.find({_id:a.id_electeur});
            console.log(c)
            const  b =await this.electeur.findOneAndUpdate({_id:a.id_electeur, valide:'valide', id_bureau:a.id_bureau}, {valide:'voter'}, {new:true})
            console.log(b)
            console.log({_id:a.id_electeur, valide:'valide', id_bureau:a.id_bureau, id_election:a.id_election})
            if(b == undefined){
                throw error;
            }
            await session.commitTransaction();
            const vote = await new this.vote(newObject);
            vote.save();
            return vote;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
        return null;
    }

    update(updatedObject: any) {
        if (updatedObject.hasOwnProperty('_id'))
            return this.vote.findOneAndUpdate({_id: updatedObject._id}, updatedObject, {new: true})
        throw TypeError('Votre election doit contenir un _id')
    }

    getResultFromElectionAndCadidatId(id_election: string, id_candidat: string) {

        return this.vote.find({id_election:id_election}, {_id:true}).count().then(total => {
            console.log(total);
            if(total == 0){
                return  0.00
            }
            return this.vote.find({id_election:id_election, id_candidat:id_candidat}, {_id:true}).count().then(value => {
                console.log(value);
                return value/total;
            });
        });
    }

    deleteOne(id: string) {
        return this.vote.findOneAndDelete({_id: id})
    }

    getOne(id: string) {
        return this.vote.findOne({_id: id}).exec()
    }

    getElectionVotes(id_organisation: string) {
        return this.vote.find({id_election: id_organisation}).exec();
    }

    getCandidatVote(id_organisation: string) {
        return this.vote.find({id_cadidat: id_organisation}).exec();
    }

    getBureauVote(id_organisation: string) {
        return this.vote.find({id_bureau: id_organisation}).exec();
    }

    getAll() {
        return this.vote.find().exec();
    }
}
