import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, HydratedDocument, Schema as Schema2 } from "mongoose";


export type OrganisationDocument = HydratedDocument<Organisation>

@Schema()
export class Organisation extends Document{

    @Prop({required:true, unique:true})
    nom: string
    @Prop({type:Schema2.Types.ObjectId, ref:'User', required:true})
    id_user: string
    @Prop()
    code: string
    @Prop()
    createAt: Date
    @Prop()
    updatedAt: Date
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation)