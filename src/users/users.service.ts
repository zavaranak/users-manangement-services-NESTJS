import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Actions } from 'src/actions-record/entities/actions-record.entity';
import { CreateActionsRecordDto } from 'src/actions-record/dto/create-actions-record.dto';
import { ActionsRecordService } from 'src/actions-record/actions-record.service';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PaginationMetaDto } from 'src/pagination/pagination-meta';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginationOptionsDto } from 'src/pagination/pagination-options.dto';

@Injectable()
export class UserService {

  private userRepository;
  constructor(private datasource: DataSource, private actionRecordService: ActionsRecordService) {
    this.userRepository = datasource.getRepository(Users);
  }

  async create(createUserDto: CreateUserDto) {
    const userdata = plainToClass(CreateUserDto, createUserDto)
    const errors = validateSync(userdata);
    if (errors.length > 0) throw new BadRequestException(errors)

    const newUser = await this.userRepository.save(userdata)
    const newAction = new CreateActionsRecordDto();
    newAction.action = Actions.CREATE;
    newAction.userID = newUser.id;
    this.actionRecordService.create(newAction);
    return newUser
  }

  async findAll(paginationOptions?: PaginationOptionsDto): Promise<PaginationDto<Users>> {
    const pageOptions = plainToClass(PaginationOptionsDto, paginationOptions)
    const errors = validateSync(pageOptions);
    if (errors.length > 0) throw new BadRequestException(errors)
    const queryBuilder = this.userRepository.createQueryBuilder("user");
    queryBuilder
      .skip(pageOptions.take * (pageOptions.page - 1))
      .take(pageOptions.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const meta = new PaginationMetaDto(pageOptions, itemCount)
    return new PaginationDto(entities, meta)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedata = plainToClass(UpdateUserDto, updateUserDto)
    const errors = validateSync(updatedata)
    if (errors.length > 0) throw new BadRequestException(errors)

    let toBeUpdated: Users = await this.userRepository.findOneBy({ id });
    if (!toBeUpdated) throw new NotFoundException;

    const updateFields = Object.keys(updatedata);
    updateFields.map(
      field => {
        let newAction = new CreateActionsRecordDto()
        newAction.action = Actions[field]
        newAction.userID = toBeUpdated.id;
        this.actionRecordService.create(newAction)
      }
    )

    Object.assign(toBeUpdated, updateUserDto)
    return this.userRepository.save(toBeUpdated)
  }

  async solve(id: number) {
    await this.userRepository.update(id, { hasProblem: false })
    const newAction = new CreateActionsRecordDto();
    newAction.action = Actions.hasProblem;
    newAction.userID = id;
    this.actionRecordService.create(newAction);
    return this.userRepository.createQueryBuilder('user').where(`user.hasProblem= :flag`, { flag: true }).getCount()
  }
}
