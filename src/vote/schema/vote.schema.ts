import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type VoteDocument = HydratedDocument<Vote>

@Schema()
export class Vote{
    @Prop({type:Schema2.Types.ObjectId, ref:'Bureau', require:true})
    id_bureau: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Candidat',require:true})
    id_candidat: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Election',require:true})
    id_election: string


}


export const VoteSchema = SchemaFactory.createForClass(Vote);