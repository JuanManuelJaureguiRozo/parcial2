/* eslint-disable prettier/prettier */
import { ClubEntity } from '../../club/club.entity/club.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SocioEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column()
    usuario: string;
 
    @Column()
    email: string;
   
    @Column()
    fechaNacimiento: string;

    @ManyToMany(() => ClubEntity, club => club.socios)
    clubs: ClubEntity[];
}
