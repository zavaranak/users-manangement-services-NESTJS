import { MigrationInterface, QueryRunner } from "typeorm";
import { Users, enumGender } from '../../src/users/entities/users.entity'
export class CreateMillionUsers1717850637791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const batchSize = 1000;
        for (let i = 0; i < 100000; i += batchSize) {
            const users: Users[] = [];
            for (let j = 0; j < batchSize; j++) {
                const user = new Users();
                const random = Math.random() * 3;
                user.firstname = `Firstname${i + j}`;
                user.lastname = `Lastname${i + j}`;
                if (random > 2) {
                    user.gender = enumGender.MALE;
                    user.hasProblem = true;
                } else if (random > 1) {
                    user.gender = enumGender.FEMALE;
                } else {
                    user.gender = enumGender.UNSPEC;
                }
                user.age = Math.ceil(20 * random);
                users.push(user);
            }
            await queryRunner.manager.save(users);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
