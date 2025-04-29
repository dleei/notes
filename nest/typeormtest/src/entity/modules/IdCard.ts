import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number

  @CreateDateColumn()
  createTime: Date

  @Column()
  address: string

  @OneToOne(() => User, user => user.idCard)
  @JoinColumn()
  user: User
}
