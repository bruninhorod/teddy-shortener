import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript'
import { ShortenedUrl } from './shortened-url'

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, 
  })
  username!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @HasMany(() => ShortenedUrl) 
  shortenedUrls?: ShortenedUrl[]
}