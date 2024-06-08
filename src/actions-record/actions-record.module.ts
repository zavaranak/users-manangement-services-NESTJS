import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActionsRecord } from "./entities/actions-record.entity";
import { ActionsRecordController } from "./actions-record.controller"
import { ActionsRecordService } from "./actions-record.service"

@Module({
  imports: [TypeOrmModule.forFeature([ActionsRecord])],
  controllers: [ActionsRecordController],
  providers: [ActionsRecordService]
})

export class ActionsRecordModule { }
