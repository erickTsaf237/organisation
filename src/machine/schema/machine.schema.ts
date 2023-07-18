import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type MachineDocument = HydratedDocument<Machine>

@Schema()
export class Machine{
    @Prop({type:Schema2.Types.ObjectId, ref:'Bureau', require:true})
    id_bureau: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Employe',require:true})
    id_employe: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Election',require:true})
    id_election: string
    @Prop({type:Schema2.Types.String,require:true})
    nom: string
    @Prop({type:Schema2.Types.String,require:true})
    prenom: string
    @Prop({type:Schema2.Types.String})
    createdAt: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Electeur',require:false})
    id_electeur: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Electeur',require:false})
    id_electeur_confirm: string


}


export const MachineSchema = SchemaFactory.createForClass(Machine);