import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   
    constructor(private readonly adminsService: AdminsService,
        private readonly jwtService: JwtService
    ){}

    async createNewAdmin({name, email, password}: RegisterDto) {

        const admin = await this.adminsService.findOneByEmail(email)
        
        if(admin){
            throw new BadRequestException('UserAlready exist');
        }

        
       await this.adminsService.create({
        name,
         email,
          password: await bcrypt.hash(password, 10) //enriptar el password
        })
          
        return {
            name,
            email,
        }
        /*
        //para desencriptar
const isMatch = await bcrypt.compare(enteredPassword, hashedPasswordFromDatabase);
        */
        
 
    }


    async login({email, password}: LoginDto){
        const admin = await this.adminsService.findOneByEmailWithPassword(email);

        if(!admin){
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid password');
        }

        const payload = {email: admin.email, sub: admin.id, role: admin.role} // es lo que senviara en jwt en este caso no necesitaria sub xq los emai son unicos
        //Nocolocar info confidencial en payload
        const token = await this.jwtService.signAsync(payload);

        return{token, email}
    }

    async profile({ email, role }: { email: string; role: string }) {
        return await this.adminsService.findOneByEmail(email);
      }
}
