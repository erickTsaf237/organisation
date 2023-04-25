import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Section} from "./schema/section.shema";

@Injectable()
export class SectionService {
    constructor(@InjectModel(Section.name) private section:typeof Model<Section>) {
    }

    create(newObject: Section) {
        const elec = new this.section(newObject);
        return elec.save();
    }

    update(updatedObject: any) {
        if(updatedObject.hasOwnProperty('_id'))
            return this.section.findOneAndUpdate({_id:updatedObject._id}, updatedObject, {new:true})
        throw TypeError('Votre election doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.section.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.section.findOne({_id:id}).exec()
    }

    getOrganistaionSections(id_organisation: string) {
        return this.section.find({id_organisation:id_organisation}).exec();
    }

    getAll() {
        return this.section.find().populate('id_organisation').exec();
    }

}
