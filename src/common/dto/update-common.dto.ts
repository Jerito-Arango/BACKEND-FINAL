import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsEmail,
  MinLength,
} from 'class-validator';

export class UpdateCommonDTO {
  @IsOptional()
  @IsString()
  id?: string;
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name?: string;
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
