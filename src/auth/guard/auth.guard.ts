import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constatnts/jwt.constats';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(
  private readonly jwtService: JwtService,
){}

  async canActivate(context: ExecutionContext,): Promise<boolean> { // entra aqui cada vez q se quiera acceder a una ruta
    
    const request = context.switchToHttp().getRequest()
    console.log(request.headers.authorization);

    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }

    try{
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret,//process.env.JWT_SECRET
        }

      );
      request['admin'] = payload; //se esta creando ese campo y se lo esta asignando la parte del payload
    }catch{ //esto se ejecutara en caso e q la palaabra secreta no coincida
      throw new UnauthorizedException();
    }
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined{ // El Request tiene q ser de express
    const [type, token] = request.headers.authorization?.split(' ')??[];
    return type === 'Bearer'? token : undefined
  }
}
