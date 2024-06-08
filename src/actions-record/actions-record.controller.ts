import { ApiTags, ApiQuery } from "@nestjs/swagger";
import { ActionsRecordService } from "./actions-record.service";
import { Query } from "@nestjs/common";
import { PaginationDto } from "src/pagination/pagination.dto";
import { ActionsRecord } from "./entities/actions-record.entity";
import { PaginationOptionsDto } from "src/pagination/pagination-options.dto";
import { findActionsQueryDto } from "./dto/find-actions-query-dto";
import { Controller, Get } from '@nestjs/common'

@ApiTags("Record of actions with users data")
@Controller('actions-record')
export class ActionsRecordController {
    constructor(private readonly actionsRecordService: ActionsRecordService) {
    }
    @ApiQuery({ name: 'take', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: "userID", required: false })
    @Get()
    find(@Query() findActionsQuery?: findActionsQueryDto): Promise<PaginationDto<ActionsRecord>> {
        const paginationOptions = new PaginationOptionsDto(findActionsQuery.take, findActionsQuery.page)
        return this.actionsRecordService.findAction(paginationOptions, findActionsQuery.userID);
    }
}

