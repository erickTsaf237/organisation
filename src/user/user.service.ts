import { Injectable } from '@nestjs/common';
import {User} from "./shemas/users.shema";
import * as bcrypt from 'bcrypt';
import {Model} from "mongoose";
import * as Mongo from "@nestjs/mongoose";

@Injectable()
export class UserService {
    constructor(@Mongo.InjectModel(User.name) private userModel: typeof Model<User>
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find({}).exec();
    }

    findOne(id: string): Promise<User> {
        console.log(id);
        return this.userModel.findOne({
            _id:id,
        });
    }

    async remove(id: string): Promise<string> {
        // const user = await this.userModel.findOne({where: {id}});
        // if (user != null) {
        //     return await user.destroy().then((res=> "succes")
        //     );
        // }
        await this.userModel.deleteOne({'_id': id}).exec().then((res=> "succes"));
        // const User

        return "Failed";

    }

    async create(newUser: User): Promise<User> {
        const saltOrRounds = 10;
        const password = newUser.password;
        newUser.password = await bcrypt.hash(password, saltOrRounds);
        console.log(newUser.password);

        await this.userModel.findOne({login: newUser.login}).exec().then(value => {
            if (value !=null)
                throw new TypeError('Email deja present');
        });
        const boo= new this.userModel(newUser)
        return boo.save();
    }

    update(newUser: any) {
        return this.userModel.findOneAndUpdate({_id: newUser.id}, newUser, {new: true}).catch((error)=>{
            console.table(error);
        });
    }

    async findOneByLogin(login: string): Promise<any> {
        return this.userModel.findOne( {login: login});
    }
}
