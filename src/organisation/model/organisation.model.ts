import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";


@Table({tableName: "Organisation"})
export class OrganisationModel extends Model{
    @Column({allowNull: false, })
    nom: string;
    @ForeignKey(() => User)
    @Column({allowNull: false, unique: true })
    id_user: number;
    @Column({allowNull: false, })
    code: string;
    @Column
    image: string;
    @Column
    description: string;
    @BelongsTo(()=>User)
    user: User



}