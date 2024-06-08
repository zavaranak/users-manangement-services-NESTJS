import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ActionsRecord } from 'src/actions-record/entities/actions-record.entity';
import { ActionsRecordService } from 'src/actions-record/actions-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ActionsRecord])],
  controllers: [UserController],
  providers: [UserService, ActionsRecordService],
})
export class UserModule { }
