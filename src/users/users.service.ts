import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>){}

  create(email: string, password: string){
    const user = this.repo.create({email, password})
    return this.repo.save(user)
  }

  async findOne(id: number){
    return await this.repo.findOneBy({id})
  }

  async find(email: string){
    return await this.repo.find({where: {email}})
  }

  async update(id: number, attrs: Partial<User>){
    const user = await this.findOne(id)
    if (!user){
      throw new Error(`User with ID[${id}] not found`)
    }
    console.log(user)
    Object.assign(user, attrs)
    return this.repo.save(user)
  }

  async remove(id: number){
    const user = await this.findOne(id)
    if (!user){
      throw new Error(`User with ID[${id}] not found`)
    }

    return this.repo.remove(user)
  }
}
