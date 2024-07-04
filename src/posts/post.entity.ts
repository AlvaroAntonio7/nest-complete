import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('posts')
export class Post{

@PrimaryGeneratedColumn()
id:number

@Column()
title: string

@Column()
content: string

@Column()
authorId: number

//Relacion muchos a uno
@ManyToOne(()=>User, user => user.posts)
author:User
}












