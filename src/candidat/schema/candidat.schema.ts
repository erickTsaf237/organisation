import {HydratedDocument, Schema as Schema2} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type CandidatDocument = HydratedDocument<Candidat>


@Schema()
export class Candidat{

    @Prop({required: true})
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop({required: true})
    parti:string

    @Prop()
    lien:string
    @Prop()
    image:string

    @Prop()
    date_naissance:string
    @Prop({type: Schema2.Types.ObjectId,  ref:'elections',require:true})
    id_election:string


}

export const CandidatSchema = SchemaFactory.createForClass(Candidat);
CandidatSchema.index({parti:1, id_election:1})