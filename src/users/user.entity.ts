import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/post.entity";

@Entity({name: 'users'}) //si no se coloca e name se usara el nombre de la clase n plural
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    userName: string

    @Column()
    password: string

    @Column({type: 'datetime',default: ()=>'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string

//Las relaciones
//uno a uno
@OneToOne(()=> Profile)
@JoinColumn()
profile: Profile

//Relaciones uno a muchos
@OneToMany(()=> Post, post => post.author)
posts: Post[]
}