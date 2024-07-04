import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService){}           
    
async createPost(post: CreatePostDto){
const userFound = await this.usersService.getUserById(post.authorId);

if(!userFound) return new HttpException("User not Found", HttpStatus.NOT_FOUND)

const newPost = this.postsRepository.create(post)
return this.postsRepository.save(newPost) //podria ser await en vez de return
}

getPosts(){
    return this.postsRepository.find(
        {relations: ['author']} //esto es para que al buscar salgan los datos del autor, author es el nombre que se puso en l a relacion post entity
    )
}

}
