import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";
import { Type } from 'class-transformer'

export class PaginationOptionsDto {
    @ApiProperty({ default: 1, minimum: 1 })
    @IsInt({ message: `Querry "page" is not valid` })
    @Min(1, { message: `Querry "page" has to be greater than 0` })
    @Type(() => Number)
    page?: number;
    @ApiProperty({ default: 50, minimum: 1 })
    @IsInt({ message: `Querry "take" is not valid` })
    @Min(1, { message: `Querry "take" has to be greater than 0` })
    @Type(() => Number)
    take?: number;

    constructor(take?: number, page?: number) {
        this.take = take || 50;
        this.page = page || 1;
    }
}