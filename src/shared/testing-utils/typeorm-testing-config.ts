/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioEntity } from '../../socio/socio.entity/socio.entity';
import { ClubEntity } from '../../club/club.entity/club.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [SocioEntity, ClubEntity], // Add your entities here
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([SocioEntity, ClubEntity]), // Add your entities here
];