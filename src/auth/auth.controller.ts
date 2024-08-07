import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request, request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { ActiveAdmin } from 'src/common/decorators/active.admin.decorator';
import { AdminActiveInterface } from 'src/common/interfaces/admin-active.interface';


interface RequestWithUser extends Request{ //deberia ir en un directorio de interfaces
    admin:{
        email:string;
        sub:number;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    createNewAdmin(@Body() newAdmin:RegisterDto){
        return this.authService.createNewAdmin(newAdmin);
    }

    @Post('login')
    login(@Body() LoginDto: LoginDto){
        return this.authService.login(LoginDto);
    }

    @Get('profile')
    @Roles(Role.ADMIN) // se puede colocar como array y distintos toles //['admin', 'user']
    @UseGuards(AuthGuard, RolesGuard) //para enviar la cabecera de autenticacion usar Bearer Token, tambien es necesario agregar el  rolesGuard
    //@Auth(Role.ADMIN)// esto es si se usa el agrupador de decorators
    //profile(@Req() req: RequestWithUser){//esto es para agarrar desde el payload //Esta es la forma si no se habria declarado un decorador personalizado en commons
    //puede susarse coon la forma @Req() req: Request & {email:  string; sub: admin.id; role: string} pero paramejorarlo se define una interface
        
    
    profile(@ActiveAdmin() admin: AdminActiveInterface){//esta forma es usando el decorador de common
        
        //return this.authService.profile(req.admin) //forma SIN decorador personalizado
        return this.authService.profile(admin) //forma CON decorador personalizado
    }
}
