import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type ElectionDocument = HydratedDocument<Election>

@Schema()
export class Election {
    @Prop()
    libele: string
    @Prop()
    code: string
    @Prop()
    description: string
    @Prop()
    annee: Date
    // @Prop({type: Schema2.Types.Date, default: new Date()})
    @Prop({type: Schema2.Types.Date,})
    begining_voting_time: Date
    @Prop({type: Schema2.Types.Date,})
    ending_voting_time: Date
    @Prop({type: Schema2.Types.ObjectId, ref: 'Organisation', require: true})
    id_organisation: string
    @Prop({default: 1})
    valeur: number
    @Prop({default: []})
    champElecteur: [[string]]

    now: Date=new Date()


}


export const ElectionSchema = SchemaFactory.createForClass(Election);