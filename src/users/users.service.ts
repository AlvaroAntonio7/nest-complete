import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create_profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>
            ) {}    
    
    async createUser(user: CreateUserDto){
        
        const userFound = await this.userRepository.findOne({where: {userName: user.userName}})

        if(userFound){
            return new HttpException('user already exist', HttpStatus.CONFLICT)
        }

        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser) //es un metodo asincrono asi que se puede usar await o hacer que la clase quel lo use maeje la asincronia
    }

    getUsers(){
        return this.userRepository.find()
    }

    getUserById(id: number){
        return this.userRepository.findOne({
            where: {id}
        })
    }

    deleteUser(id: string){
        return this.userRepository.delete(id)
    }


    updateUser(id: number, user: UpdateUserDto){
        return this.userRepository.update({id}, user)
    }


    //Podia colocarse en otro modulo
    async createProfile(id:number, profile: CreateProfileDto){
        const userFound = await this.userRepository.findOne({
            where: {id}
        })

        if(!userFound){
            return new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        const newProfile = this.profileRepository.create(profile)
        const saveProfile = await this.profileRepository.save(newProfile)
        userFound.profile = saveProfile

        return this.userRepository.save(userFound)
    }
}
