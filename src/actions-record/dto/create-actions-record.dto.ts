import { Actions } from "../entities/actions-record.entity";

export class CreateActionsRecordDto {
    action: Actions;
    userID: number;
}
