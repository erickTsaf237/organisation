import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Employe} from "./schema/employe.schema";
import {Model} from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class EmployeService {

    constructor(@InjectModel(Employe.name) private employe:typeof Model<Employe>) {
    }

    async create(newObject: Employe) {
        const saltOrRounds = 10;
        const password = newObject.password;
        newObject.password = await bcrypt.hash(password, saltOrRounds);
        console.log(newObject.password);

        await this.employe.findOne({login: newObject.login}).exec().then(value => {
            if (value != null)
                throw new TypeError('Email deja present');
        });
        const elec = new this.employe(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if(updatedObject.hasOwnProperty('_id'))
            return this.employe.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.employe.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.employe.findOne({_id:id}).exec()
    }

    getsectionEmployes(id_section: string) {
        return this.employe.find({id_section:id_section}).exec();
    }

    getAll() {
        return this.employe.find().exec();
    }
}
