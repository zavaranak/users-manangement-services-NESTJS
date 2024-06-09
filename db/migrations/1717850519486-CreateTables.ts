import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1717850519486 implements MigrationInterface {
    name = 'CreateTables1717850519486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'unspecified')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "age" integer NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'unspecified', "hasProblem" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."actions_record_action_enum" AS ENUM('Update firstname', 'Update lastname', 'Update age', 'Update gender', 'Update problem status', 'Create new user')`);
        await queryRunner.query(`CREATE TABLE "actions_record" ("id" SERIAL NOT NULL, "action" "public"."actions_record_action_enum" NOT NULL, "dateIssue" TIMESTAMP NOT NULL DEFAULT now(), "userID" integer NOT NULL, CONSTRAINT "PK_426d934a23b3554bb28d0d3c476" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "actions_record"`);
        await queryRunner.query(`DROP TYPE "public"."actions_record_action_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
