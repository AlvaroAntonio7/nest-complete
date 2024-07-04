import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Post]), UsersModule], //asi se importa el otro modulo
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
