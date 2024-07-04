import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'nestDB',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],//esta notacion indica cualquier archivo que tenga la extencion entity
    synchronize: true, //indica que los cambios se reflejen en la BD // para produccion es mejor usar una migracion
  }),
    UsersModule,
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
