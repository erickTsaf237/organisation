import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type BureauDocument = HydratedDocument<Bureau>

@Schema({collection:'bureaux'})
export class Bureau{
    @Prop({require:true})
    password:string
    @Prop({require:true})
    nom: string
    @Prop({require:true})
    ville: string
    @Prop()
    description: string
    @Prop({require:true})
    localisation: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Section',require:true})
    id_section: string
    @Prop([{type:Schema2.Types.ObjectId, ref:'Employe'}])
    id_employes: [string]
    @Prop({type:Schema2.Types.ObjectId, ref:'Election',require:true})
    id_election: string
    @Prop( {type:Schema2.Types.ObjectId, ref:'Employe',require:true})
    id_chef_section: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Employe',require:true})
    id_responsable: string



}


export const BureauSchema = SchemaFactory.createForClass(Bureau);