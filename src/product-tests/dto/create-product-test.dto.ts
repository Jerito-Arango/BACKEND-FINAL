import { IsString, IsNumber } from 'class-validator';

export class CreateProductTestDto {
  @IsString()
  readonly tester_id: string;

  @IsString()
  readonly product_id: string;

  @IsString()
  readonly reaction: string;

  @IsNumber()
  readonly rating: number;

  @IsNumber()
  readonly survival_status: number;
}
