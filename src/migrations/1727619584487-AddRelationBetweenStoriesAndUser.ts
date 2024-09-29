import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationBetweenStoriesAndUser1727619584487 implements MigrationInterface {
    name = 'AddRelationBetweenStoriesAndUser1727619584487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "stories" ADD CONSTRAINT "FK_e36e259ea3b3799645774194033" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories" DROP CONSTRAINT "FK_e36e259ea3b3799645774194033"`);
        await queryRunner.query(`ALTER TABLE "stories" DROP COLUMN "authorId"`);
    }

}
