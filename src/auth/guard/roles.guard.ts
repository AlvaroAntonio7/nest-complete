import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Role } from '../../common/enums/rol.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector:Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean  {
const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [ //roles es el key de los metadatos EN ESTE CASO SE llamo a ROLES_KEY
  context.getHandler(),
  context.getClass(),

]) // este es el metatype es un arreglo que contiene los elementos de los cules se obtendran los metadatos. En este caso un arreglo con 2 elementos

if(!role){ // es en caso no se useel rol
  return true
}

const {admin} = context.switchToHttp().getRequest(); // aqui lee y destructura desde el payload

if(admin.role === Role.ADMIN ){ //este condicional es para la escala de privilegios para que ADMI pueeda hacer lo que hace user
  return true
}


    return role === admin.role
    //En caso de tener los roles en un array return requiredRoles.some((role) => admin.roles?.includes(role))
  }
}
