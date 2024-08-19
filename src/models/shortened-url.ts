import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './user'


@Table({
  tableName: 'shortened_urls',
  timestamps: true,
  paranoid: true,
})
export class ShortenedUrl extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalUrl!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  shortenedUrl!: string

  @ForeignKey(() => User) 
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId?: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  clickCount!: number

  @Column(DataType.DATE)
  deletedAt?: Date

  @BelongsTo(() => User)
  user?: User
}
