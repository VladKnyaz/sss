import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  address?: string;
}
