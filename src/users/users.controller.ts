import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create_profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.usersService.createUser(newUser);
    }

    @Get()
    getAllUsers(){ //si se quierere especificar el dato que retorna seria Promise<User[]>, pero en caso de que pueda devlver una exception ya no serviria
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUseeById(@Param('id', ParseIntPipe) id:number){ // el ParseItPipe no  es estrictamente necesario xq typeORM puede hacer laconversion automaticamente
        return this.usersService.getUserById(id);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id:number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user);
    }

    @Post(':id/profile')
    createProfile(@Param('id', ParseIntPipe) id:number, @Body() profile: CreateProfileDto){
        return this.usersService.createProfile(id, profile);
    }
}
