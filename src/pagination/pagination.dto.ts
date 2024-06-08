import { PaginationMetaDto } from "./pagination-meta";

export class PaginationDto<T> {
    data: T[];
    meta: PaginationMetaDto;
    constructor(data: T[], meta: PaginationMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}