import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "src/modules/category";

@Table({ tableName: 'food', timestamps: true })
export class Food extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    creator_id: number

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    receipt: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    cooking_time: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    video: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_passed: boolean

    @Column({
        type: DataType.DECIMAL(3, 2),
        allowNull: false,
    })
    rating: string

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: "NO ACTION"
    })
    category_id: number

    @BelongsTo(() => Category)
    category: Category
}
