import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type TestDocument = HydratedDocument<Test>


@Schema()
export class Test{

    @Prop()
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop({required: true})
    login:string


}

export const TestSchema = SchemaFactory.createForClass(Test);
