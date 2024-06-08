import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto';
import { enumGender } from '../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Matches } from 'class-validator';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @Matches(RegExp(/^[A-Za-z]+[A-Za-z-_']+$/), {
        message: 'provide a valid name',
    })
    firstname?: string;
    @ApiProperty()

    @Matches(RegExp(/^[A-Za-z]+[A-Za-z-_']+$/), {
        message: 'provide a valid name',
    })
    lastname?: string;
    @ApiProperty()
    age?: number;

    @ApiProperty()
    @IsEnum(enumGender, { message: "Gender invalid" })
    gender?: enumGender;

    @ApiProperty()
    hasProblem?: boolean;
}
