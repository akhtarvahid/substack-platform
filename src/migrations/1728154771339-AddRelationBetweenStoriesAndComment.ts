import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationBetweenStoriesAndComment1728154771339 implements MigrationInterface {
    name = 'AddRelationBetweenStoriesAndComment1728154771339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "storyId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_52fcd6c4462f38e9f6d458752e2" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_52fcd6c4462f38e9f6d458752e2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "storyId"`);
    }
}
