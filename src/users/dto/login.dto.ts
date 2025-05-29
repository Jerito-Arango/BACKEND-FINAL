import { IsEmail, IsString, MinLength } from 'class-validator';
export class loginAuthDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(12)
  password: string;
}
