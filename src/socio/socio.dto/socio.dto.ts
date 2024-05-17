/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class SocioDto {
  @IsString()
  @IsNotEmpty()
  readonly usuario: string;
  
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly fechaNacimiento: string;
}
