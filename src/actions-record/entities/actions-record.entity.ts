import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

export enum Actions {
  firstname = 'Update firstname',
  lastname = 'Update lastname',
  age = 'Update age',
  gender = 'Update gender',
  hasProblem = 'Update problem status',
  CREATE = 'Create new user',
};

@Entity()
export class ActionsRecord {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: "enum", enum: Actions, nullable: false })
  action: Actions;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateIssue: Timestamp;

  @Column({ type: "integer", nullable: false })
  userID: number;
}

