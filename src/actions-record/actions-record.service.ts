import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActionsRecord } from "./entities/actions-record.entity";
import { DataSource, Repository } from "typeorm";
import { CreateActionsRecordDto } from "./dto/create-actions-record.dto";
import { PaginationDto } from "src/pagination/pagination.dto";
import { PaginationOptionsDto } from "src/pagination/pagination-options.dto";
import { PaginationMetaDto } from "src/pagination/pagination-meta";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { BadRequestException } from "@nestjs/common";


@Injectable()
export class ActionsRecordService {
  private actionsRepository;
  constructor(
    private dataSource: DataSource
  ) {
    this.actionsRepository = dataSource.getRepository(ActionsRecord)
  }
  async create(newAction: CreateActionsRecordDto) {
    this.actionsRepository.insert(newAction).then(() => { return "action recorded" }).catch(err => { return "Unable to record action" + err })
  }

  async findAction(paginationOptions: PaginationOptionsDto, userID?: Number): Promise<PaginationDto<ActionsRecord>> {
    const pageOptions = plainToClass(PaginationOptionsDto, paginationOptions)
    const errors = validateSync(pageOptions);

    if (errors.length > 0) throw new BadRequestException(errors)
    const queryBuilder = this.actionsRepository.createQueryBuilder("actions")
    queryBuilder
      .skip(pageOptions.take * (pageOptions.page - 1))
      .take(pageOptions.take)

    if (userID) queryBuilder
      .where(`actions.userID= :id`, { id: userID });

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const meta = new PaginationMetaDto(pageOptions, itemCount)
    return new PaginationDto(entities, meta)
  }
}