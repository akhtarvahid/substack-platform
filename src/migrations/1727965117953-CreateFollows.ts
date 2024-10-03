import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFollows1727965117953 implements MigrationInterface {
    name = 'CreateFollows1727965117953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
