import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonEntity } from './entities/common.entity';
import { CommonService } from './common.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommonEntity])],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
