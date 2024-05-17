/* eslint-disable prettier/prettier */
import { SocioEntity } from 'src/socio/socio.entity/socio.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClubEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column()
    nombre: string;
 
    @Column()
    fechaFundacion: string;
   
    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @ManyToMany(() => SocioEntity, socio => socio.clubs)
    @JoinTable()
    socios: SocioEntity[];
}
