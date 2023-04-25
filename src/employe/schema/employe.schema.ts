import {HydratedDocument, Schema as Schema2} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type EmployeDocument = HydratedDocument<Employe>


@Schema()
export class Employe{

    @Prop()
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop({required: true})
    login:string
    @Prop({required: true, unique:true})
    password:string
    @Prop({required: true})
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
