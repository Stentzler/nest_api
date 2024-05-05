import { Body, Query, Controller, Get, Param, Post, Delete, Patch, NotFoundException } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post('/signup')
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto){
    this.usersService.create(body.email, body.password)
  }

  @Get('/:id')
  @Serialize(UserDto)
  async findUser(@Param('id') id: string){
    const user = await this.usersService.findOne(parseInt(id))
    if(!user){
      throw new NotFoundException(`User with ID[${id}] not found`)
    }
    return user
  }

  @Get()
  @Serialize(UserDto)
  findAllUsers(@Query('email') email: string){
    return this.usersService.find(email)
  }

  @Delete('/:id')
  @Serialize(UserDto)
  async deleteUser(@Param('id') id: string){
    const respose = await this.usersService.remove(parseInt(id))
    if (respose === null){
      throw new NotFoundException(`User with ID[${id}] not found`)
    }
    
    return respose
  }

  @Patch('/:id')
  @Serialize(UserDto)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    const respose = await this.usersService.update(parseInt(id), body)
    if (respose === null){
      throw new NotFoundException(`User with ID[${id}] not found`)
    }
    
    return respose
  }
}
