import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password: string

  @AfterInsert()
  logInsert(){
    console.log(`Inserted user with ID[${this.id}] EMAIL[${this.email}]`)
  }

  @AfterUpdate()
  logUpdate(){
    console.log(`Updated user with ID[${this.id}] EMAIL[${this.email}]`)
  }

  @AfterRemove()
  logRemove(){
    console.log(`Removed user with ID[${this.id}] EMAIL[${this.email}]`)
  };
}