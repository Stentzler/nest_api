import { Body, Query, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';


@Controller('auth') // rout prefix
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto){
    this.usersService.create(body.email, body.password)
  }

  @Get('/:id') //retornando pass
  findUser(@Param('id') id: string){
    return this.usersService.findOne(parseInt(id))
  }

  @Get()//retornando pass
  findAllUsers(@Query('email') email: string){
    return this.usersService.find(email)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string){
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    return this.usersService.update(parseInt(id), body)
  }
}
