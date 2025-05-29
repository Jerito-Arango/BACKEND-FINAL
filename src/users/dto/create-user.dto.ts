import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class CreateUserDto {
  // Removed the index signature to avoid type conflicts
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(10)
  readonly password: string;

  @IsEnum(UserRole) // Validar que el rol sea uno de los valores
  readonly role: UserRole; // Usamos el enum como tipo

  @IsOptional()
  purchase_history?: {
    productId: string;
    purchaseDate: Date;
    amount: number;
  }[];
}

// Extensiones de los roles
export class TesterDto extends CreateUserDto {
  test_subject_status: boolean;
  allergic_reactions: string;
}

export class ClientDto extends CreateUserDto {}
