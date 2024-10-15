import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/modules/category";
import { Food } from "src/modules/food";

export enum UserRoles {
    user = 'user',
    admin = 'admin',
}
@Table({ tableName: 'user', timestamps: true })
export class User extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    fullName: string

    @Column({ type: DataType.STRING })
    image: string

    @Column({ type: DataType.DATE })
    experience: Date

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    phone: string

    @Column({ type: DataType.ENUM('admin', 'user'), defaultValue: 'user' })
    role: string

    @Column({ type: DataType.STRING })
    password: string

    @HasMany(() => Food, 'creator_id')
    foods: Food[];
}