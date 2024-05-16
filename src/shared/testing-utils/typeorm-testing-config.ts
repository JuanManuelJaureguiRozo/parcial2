/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [], // Add your entities here
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([]), // Add your entities here
];