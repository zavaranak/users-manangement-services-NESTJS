import { IsAlphanumeric, IsEnum, IsNumber } from "class-validator";
import {
    Entity, Column,
    PrimaryGeneratedColumn
} from "typeorm";


//export type Gender = "male" | "female" | "unspecified";
export enum enumGender { MALE = "male", FEMALE = "female", UNSPEC = "unspecified" }
@Entity()

export class Users {
    @PrimaryGeneratedColumn({ type: "integer" })
    id: number;

    @Column({ type: "varchar", length: "50", nullable: false })
    @IsAlphanumeric()
    firstname: string;

    @Column({ type: "varchar", length: "50", nullable: false })
    @IsAlphanumeric()
    lastname: string;

    @Column({ type: "integer", nullable: false })
    @IsNumber()
    age: number;

    @Column({ type: "enum", enum: enumGender, nullable: false, default: enumGender.UNSPEC })
    @IsEnum(enumGender)
    gender: enumGender;

    @Column({ default: false })
    hasProblem: boolean;
}

