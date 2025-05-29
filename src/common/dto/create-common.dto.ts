import { IsDate, IsUUID } from 'class-validator';

export class createCommonDto {
  @IsUUID()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
