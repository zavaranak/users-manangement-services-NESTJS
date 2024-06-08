import { ApiProperty } from "@nestjs/swagger";
import { enumGender } from "../entities/users.entity";
import { IsNotEmpty, IsEnum, Matches } from "class-validator";
export class CreateUserDto {

    @ApiProperty()
    @Matches(RegExp(/^[A-Za-z]+[A-Za-z-_']+$/), {
        message: 'provide a valid name',
    })
    firstname: string;
    @ApiProperty()
    @Matches(RegExp(/^[A-Za-z]+[A-Za-z-_']+$/), {
        message: 'provide a valid name',
    })
    lastname: string;
    @ApiProperty()
    age: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(enumGender, { message: "Gender invalid" })
    gender: enumGender;

    @ApiProperty()
    hasProblem?: boolean;
}
