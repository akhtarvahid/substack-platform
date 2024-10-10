import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationBetweenUserAndComment1728570826181 implements MigrationInterface {
    name = 'AddRelationBetweenUserAndComment1728570826181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_52fcd6c4462f38e9f6d458752e2"`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "authorId"`);
    }

}
