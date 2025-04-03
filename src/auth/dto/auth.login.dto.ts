import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  name: string;
  @IsString()
  password: string;
}
