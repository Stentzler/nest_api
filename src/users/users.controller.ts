import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth') // rout prefix
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto){ // DTO class
    console.log(body)
  }
}
