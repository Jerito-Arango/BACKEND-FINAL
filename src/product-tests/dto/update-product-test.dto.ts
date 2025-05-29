import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTestDto } from './create-product-test.dto';

export class UpdateProductTestDto extends PartialType(CreateProductTestDto) {}
