import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Food } from "src/modules/food";

@Table({ tableName: 'Categories', timestamps: true })
export class Category extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, allowNull: false })
    id: number

    @Column({ type: DataType.STRING, primaryKey: true })
    name: string

    @HasMany(() => Food)
    foods: Food[]
}
