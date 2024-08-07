import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {

  constructor(@InjectRepository(Admin) private readonly adminRepository: Repository<Admin>){}

  create(createAdminDto: CreateAdminDto) {
    //const newAdmin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(createAdminDto);
  }

  findOneByEmail(email: string){
    return this.adminRepository.findOneBy({ email });
  }

  //como el password no nos devuelve con el find normal se hace esto

  findOneByEmailWithPassword(email: string){
    return this.adminRepository.findOne({
      where: { email},
      select:['id', 'name', 'email', 'password', 'role'], // se esta especificando los campos q se quieran de respuesta es CASI un query personalizado
    })
  }

}
