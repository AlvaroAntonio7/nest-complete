import { Role } from "../../common/enums/rol.enum"; //"src/common/enums/rol.enum" pero es mejor no usar src en prod
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true, nullable: false})
    email: string;

    @Column({nullable:false, select: false})// indica que no retorne en la respuesta del select, hay que tener cuidado en el servicio porque ya no regreesara la contraseña 
    password: string;

    @Column({type: 'enum', default: Role.ADMIN, enum: Role})
    role: Role;

    @DeleteDateColumn()
    deletedAt:Date;
}
