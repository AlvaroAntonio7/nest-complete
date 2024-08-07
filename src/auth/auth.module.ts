import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminsModule } from 'src/admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constatnts/jwt.constats';


@Module({
  imports:[AdminsModule, 
    JwtModule.register({
      global: true, //cualquier  modulo podra usar
      secret: jwtConstants.secret, //la palabra secreta 
      signOptions: {expiresIn:'1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
