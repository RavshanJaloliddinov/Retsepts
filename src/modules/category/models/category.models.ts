import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Food } from "src/modules/food";

@Table({ tableName: 'Categories', timestamps: true })
export class Category extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number

    @Column({ type: DataType.STRING, unique: true })
    name: string

    @HasMany(() => Food)
    foods: Food[]
}
