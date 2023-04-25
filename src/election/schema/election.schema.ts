import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type ElectionDocument = HydratedDocument<Election>

@Schema()
export class Election{
    @Prop()
    libele: string
    @Prop()
    code: string
    @Prop()
    description: string
    @Prop()
    annee: Date
    @Prop({type:Schema2.Types.ObjectId, ref:'Organisation', require:true})
    id_organisation: string
    @Prop({default:1})
    valeur: number
}


export const ElectionSchema = SchemaFactory.createForClass(Election);