import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'Categories', timestamps: true})
export class Category extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, allowNull: false})
    id: number

    @Column({type: DataType.STRING, primaryKey: true})
    name: string
}
