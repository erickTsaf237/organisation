import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Schema as Schema2} from "mongoose";


export type SectionDocument = HydratedDocument<Section>

@Schema()
export class Section{
    @Prop({require:true})
    nom: string
    @Prop({require:true})
    ville: string
    @Prop({require:true})
    categorie: string
    @Prop()
    description: string
    @Prop()
    localisation: string
    @Prop({type:Schema2.Types.ObjectId, ref:'Organisation', require:true})
    id_organisation: string
    @Prop()
    id_responsable: string

}


export const SectionSchena = SchemaFactory.createForClass(Section);