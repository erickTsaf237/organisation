import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Machine} from "./schema/machine.schema";
import {Electeur} from "../electeur/schema/electeur.schema";

@Injectable()
export class MachineService {
    constructor(
        @InjectModel(Machine.name) private macchine: typeof Model<Machine>,
    ) {
    }

    async create(newObject: Machine) {
        const u = await this.macchine.findOne({
            id_employe: newObject.id_employe,
            id_bureau: newObject.id_bureau,
            id_Election: newObject.id_election
        });
        console.log(u);
        if (u != null)
            throw TypeError('cet employe employe est dans un autre bureau de cette election d\'un bureau');
        const elec = new this.macchine(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if (updatedObject.hasOwnProperty('_id')) {
            const {a, ..._id} = updatedObject;
            return this.macchine.findOneAndUpdate({_id: updatedObject._id}, a, {new: true})
        }
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.macchine.findOneAndDelete({_id: id})
    }

    getOne(id: string) {
        return this.macchine.findOne({_id: id}).exec()
    }

    isMachineReadyToVote(id: string, id_employe:string) {
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        return this.macchine.findOne<Machine | null>({
            _id: id,
            id_employe:id_employe,
            id_electeur: {$ne: undefined},
            id_electeur_confirm: {$ne: undefined},
            // $where:'this.id_electeur === this.id_electeur_confirm',
            // $and: [{'id_electeur': {$eq: 'id_electeur_confirm'}}, {'id_electeur_confirm': {$eq: 'id_electeur'}}]
        }).exec().then(value => {

            return value != null && true;
        })
    }

    getMachineByBureauxId(id_bureau: string) {
        return this.macchine.find({id_bureau: id_bureau}).exec();
    }

    // getSectionsBureaux(id_section: string) {
    //     return this.macchine.find({id_section:id_section}).exec();
    // }

    getAllByElectionId(id_election) {
        return this.macchine.find({id_election: id_election}).exec();
    }

    updateVotingElecteurFromElection(id_employe: string, id_election: string, id_electeur: string) {
        return this.macchine.findOneAndUpdate<Machine|undefined>({
            id_employe: id_employe,
            id_election: id_election,
            // id_electeur_confirm: undefined,
            // id_electeur: undefined
        }, {id_electeur: id_electeur}, {new:true}).then(value => {
            console.log(value);
            return value != undefined
        })
    }

    confirmIdElector(id: string, id_electeur: string) {
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        return this.macchine.findOneAndUpdate<Machine|undefined>({
            _id: id,
            id_electeur: id_electeur,
            // id_electeur_confirm: undefined
        }, {id_electeur_confirm: id_electeur}, {new: true}).then(value => {
            console.log(value);
            return value != undefined
        }).catch((error)=>{
            console.log(error)
            return false;
        });
    }

    reinitialiser(id: string) {
        return this.macchine.findOneAndUpdate<Machine|undefined>({
            _id: id,
        }, {$id_electeur_confirm: undefined, id_electeur: undefined}, {new: false})
    }
}
