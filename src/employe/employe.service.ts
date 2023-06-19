import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Employe} from "./schema/employe.schema";
import {Model} from "mongoose";
import * as bcrypt from "bcrypt";
import { createTransport} from 'nodemailer';

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
        const electeur = await elec.save();
        // this.endActivationMail(newObject, electeur._id)
        //TODO retirer ce commataire avant d'eberger
    }

    async update(updatedObject: any) {
        if (updatedObject.hasOwnProperty('_id')) {
            if (updatedObject.hasOwnProperty('password')) {
                const {password, ...up} = updatedObject;
                const saltOrRounds = 10;
                updatedObject.password = await bcrypt.hash(password, saltOrRounds);
                // updatedObject = up;
            }
            return this.employe.findOneAndUpdate({_id: updatedObject._id}, updatedObject, {new: true})
        }
        throw TypeError('Votre employe doit contenir un _id')
    }

    deleteOne(id: string) {
        return this.employe.findOneAndDelete({_id:id})
    }

    getOne(id: string) {
        return this.employe.findOne({_id:id}).exec()
    }

    async getOnePass(id: string, password: string) {
        const emp =await this.employe.findOne({_id: id}).exec()
        if (emp != null) {
            const isMatch = await bcrypt.compare(password, emp.password);
            if (isMatch){
                return emp;
            }
        }
        throw UnauthorizedException;
    }
    updatetoken(newUser: any) {
        console.log(newUser);

        return this.employe.findOneAndUpdate({_id: newUser._id}, {token:newUser.token}, {new: true}).catch((error)=>{
            console.table(error);
        });
    }

    getsectionEmployes(id_section: string) {
        return this.employe.find({id_section:id_section}).exec();
    }

    getAll() {
        return this.employe.find().exec();
    }

    async findOneByLogin(login: string): Promise<any> {
        return this.employe.findOne( {login: login});
    }

    private transporter = createTransport({

        host:'smtp.gmail.com',
        port:587,
        //sdunfulnjemrsdzh
        secure:false,
        auth:{
            user: 'electionforyou@gmail.com',
            pass: 'sdunfulnjemrsdzh'
        },
    }, (error, info)=>{
        if(error){
            console.log(error)
        }
        else {
            console.log(info)
        }
    });


    async endActivationMail(employe:Employe, token:string){
        await this.transporter.sendMail({
            from:'electionforyou@gmail.com',
            to: employe.login,
            subject: 'Welcome '+employe.prenom,
            html: 'Good morning. <br> You have been chosen to be a new employe. </br>this ' +
                'is your id, you will use it to complete the creation your employe' +
                ' Account: <strong>' + token + '</strong>'
        });
    }

}
