import {Document, HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type UsersDocument = HydratedDocument<User>


@Schema()
export class User extends Document{

    @Prop()
    nom:string
    @Prop({required: true})
    prenom:string
    @Prop({required: true})
    login:string
    @Prop({required: true, unique:true})
    password:string
    @Prop({required: true})
    numero:string
    @Prop()
    image:string
    @Prop()
    categorie:'admin'|'personne'

    @Prop()
    date_naissance:string
    @Prop()
    token:string



}

export const UserSchema = SchemaFactory.createForClass(User);
