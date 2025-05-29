import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';
import CategoryMakeUp from './categoryMk'; // Ensure the casing matches the actual file system
export class CreateMakeupDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  readonly category: CategoryMakeUp; // Replace with 'string' or define/import 'categoryMK'

  @IsInt()
  @Min(0) //para indicar que no hay producto
  readonly stock: number;

  @IsString()
  readonly ware_house_location: string;

  @IsInt()
  @Min(1, { message: 'Durability score must be at least 1' })
  @Max(10, { message: 'Durability score must be at most 10' })
  readonly durability_score: number;
}
