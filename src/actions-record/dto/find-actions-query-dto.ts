import { Type } from "class-transformer";

export class findActionsQueryDto {
    userID?: number;
    @Type(() => Number)
    take?: number;
    @Type(() => Number)
    page?: number;

}