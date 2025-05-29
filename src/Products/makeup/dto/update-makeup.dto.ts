import { PartialType } from '@nestjs/mapped-types';
import { CreateMakeupDto } from './create-makeup.dto';

export class UpdateMakeupDto extends PartialType(CreateMakeupDto) {}
