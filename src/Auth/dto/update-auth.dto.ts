import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import {
  IsOptional,
  IsString,
  MinLength,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean; // Solo debe ser actualizado por administradores

  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email?: string;

  @IsOptional()
  role?: UserRole; // Asegurar que el rol sea uno del enum
}
