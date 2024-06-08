import { PaginationOptionsDto } from "./pagination-options.dto";

export class PaginationMetaDto {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;

    constructor(paginationOptions: PaginationOptionsDto, itemCount?: number) {
        this.page = paginationOptions.page;
        this.take = paginationOptions.take;
        this.pageCount = Math.ceil(itemCount / this.take)
        this.itemCount = itemCount;
        this.hasNextPage = this.page < this.pageCount;
        this.hasPreviousPage = this.page > 1;
    }
}