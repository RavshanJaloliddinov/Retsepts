import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum UserRoles {
    user = 'USER',
    admin = 'ADMIN',
}
@Table({ tableName: 'user', timestamps: true })
export class User extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number

    @Column({ type: DataType.STRING })
    fullName: string

    @Column({ type: DataType.STRING })
    image: string

    @Column({ type: DataType.DATE })
    experience: Date

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, unique: true })
    phone: string

    @Column({
        type: DataType.ENUM, 
        values: [UserRoles.admin, UserRoles.user],
        defaultValue: UserRoles.user,
        allowNull: false
    })

    @Column({ type: DataType.TEXT })
    password: string
}