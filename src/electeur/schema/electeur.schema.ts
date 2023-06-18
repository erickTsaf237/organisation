import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type ElecteurDocument = HydratedDocument<Electeur>

@Schema()
export class Electeur{
    @Prop({type:Schema2.Types.ObjectId, ref:'Election', require:true})
    election: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Section', require:true})
    section: string
    @Prop({ required: true, type: Object })
    donnees: Record<string, any>;
}


export const ElecteurSchema = SchemaFactory.createForClass(Electeur);