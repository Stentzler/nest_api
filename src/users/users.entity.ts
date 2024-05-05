import {BeforeRemove, AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
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
  logAfterRemove(){
    console.log(`Removal succedded for EMAIL[${this.email}]`)
  };

  @BeforeRemove()
  logBeforeRemove(){
    console.log(`Removing user with ID[${this.id}] EMAIL[${this.email}]`)
  };
}