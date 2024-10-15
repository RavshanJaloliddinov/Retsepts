import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "src/modules/category";
import { User } from "src/modules/user";

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
        defaultValue: false
    })
    is_passed: boolean

    @Column({
        type: DataType.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 2.1
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
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: "NO ACTION"
    })
    creator_id: number;
  
    @BelongsTo(() => User, 'creator_id')
    creator: User;
}
