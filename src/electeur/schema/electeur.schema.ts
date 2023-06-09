import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type ElecteurDocument = HydratedDocument<Electeur>

@Schema()
export class Electeur{
    @Prop({type:Schema2.Types.ObjectId, ref:'elections', require:true})
    id_election: string
    @Prop({type:Schema2.Types.ObjectId, ref:'sections', require:true})
    id_section: string
    @Prop({type:Schema2.Types.ObjectId, ref:'bureaux', require:true})
    id_bureau: string
    @Prop({type:Schema2.Types.ObjectId, ref:'employes', require:true})
    id_employe: string
    @Prop({required: true})
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop()
    login:string
    @Prop()
    password:string
    @Prop()
    numero:string
    @Prop({required:true})
    cni:string
    @Prop({unique:true, required:true})
    registration_number:string
    @Prop()
    image:string
    @Prop({ required: true, type: Object })
    date_naissance:Date;
    0: Record<string, any>;
}

export const ElecteurSchema = SchemaFactory.createForClass(Electeur);
ElecteurSchema.index({numero:1, id_election:1, login:1, cni:1})

