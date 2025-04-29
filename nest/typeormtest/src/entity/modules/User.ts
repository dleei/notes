import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { IdCard } from './IdCard'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @Column({
    length: 100,
  })
  nickname: string

  @Column('double')
  age: number

  @OneToOne(() => IdCard, card => card.user, { cascade: true })
  idCard: IdCard
}
