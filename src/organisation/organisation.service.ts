import {Injectable} from '@nestjs/common';
import * as bcrypt from "bcrypt";
import {Organisation} from "./schema/organisation.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class OrganisationService {

    constructor(
        @InjectModel(Organisation.name)
        private organisation: typeof Model<Organisation>,
    ) {
    }

    async findAll(id: string): Promise<Organisation[]> {
        return this.organisation.find({id_user: id}).exec();
    }

    findOne(id_user: string): Promise<Organisation> {
        console.log('eeeeeeeeeeeeeeeeeeee');

        return this.organisation.findOne({id_user:id_user});
            
    }
    findOneByPK(id: string): Promise<Organisation> {
        console.log('*************************   '+id);
        try {
            const a= this.organisation.findOne({_id:id});
            return a;
        }catch (e) {
            console.error(e.trace());
            return e;
        }


    }

    async remove(id: string): Promise<string> {
        const user = await this.organisation.findOne({where: {id}});
        if (user != null) {
            return await user.destroy().then((res => "succes")
            );
        }
        return "Failed";

    }

    async create(newUser: Organisation): Promise<Organisation> {
        const saltOrRounds = 10;
        const password = newUser.code;
        newUser.code = await bcrypt.hash(password, saltOrRounds);
        console.log(newUser.code);
        // @ts-ignore
        const a = await this.organisation.create(newUser)
        return a.save();
    }

    update(newUser: any) {
        return this.organisation.findOneAndUpdate({_id: newUser._id}, newUser, {new: true}).catch(err=>{
            console.log(err);
        });
    }

}
