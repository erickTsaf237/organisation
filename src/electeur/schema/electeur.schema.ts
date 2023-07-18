import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type ElecteurDocument = HydratedDocument<Electeur>

@Schema()
export class Electeur{
    @Prop({type:Schema2.Types.ObjectId, ref:'elections', require:true})
    id_election: string
    @Prop({type:Schema2.Types.ObjectId, ref:'sections', require:false})
    id_section: string
    @Prop({type:Schema2.Types.ObjectId, ref:'bureaux', require:false})
    id_bureau: string
    @Prop({type:Schema2.Types.ObjectId, ref:'employes', require:false})
    id_employe: string
    @Prop({required: true})
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop({type:Schema2.Types.ObjectId||'', ref:'User'})
    id_user:string
    @Prop()
    email:string
    @Prop()
    password:string
    @Prop()
    numero:string
    @Prop()
    valide:string
    @Prop({required:true})
    numero_de_cni:string
    @Prop()
    registration_number:string
    @Prop()
    photo_electeur:string
    @Prop()
    photo_cni_avant:string
    @Prop()
    photo_cni_arriere:string
    @Prop({ required: true, type: Object })
    date_naissance:Date;
    0: Record<string, any>;
}

export const ElecteurSchema = SchemaFactory.createForClass(Electeur);
ElecteurSchema.index({numero:1, id_election:1, login:1, cni:1})

