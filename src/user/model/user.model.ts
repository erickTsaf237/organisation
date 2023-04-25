import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import {OrganisationModel} from "../../organisation/model/organisation.model";

@Table
export class User extends Model {
    @Column({ allowNull: false})
    nom: string;

    @Column({ allowNull: false})
    prenom: string
    @Column({unique: true, allowNull: false})
    login: string
    @Column
    password: string
    @Column({unique: true, allowNull: false})
    numero: string
    @Column
    token: string
    @Column
    image: string
    @Column
    date_naissance: Date;

    @HasMany(() => OrganisationModel)
    organinsation: OrganisationModel[];



}
