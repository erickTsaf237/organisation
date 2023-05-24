import {HydratedDocument, Schema as Schema2} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type EmployeDocument = HydratedDocument<Employe>


@Schema()
export class Employe{

    @Prop({required: true})
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop()
    login:string
    @Prop({required: true})
    password:string
    @Prop()
    numero:string
    @Prop()
    image:string

    @Prop()
    date_naissance:string
    @Prop()
    token:string
    @Prop({type:Schema2.Types.ObjectId, ref:'Section', require:true})
    id_section:string



}

export const EmployeSchema = SchemaFactory.createForClass(Employe);
