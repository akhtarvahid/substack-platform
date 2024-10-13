import { MigrationInterface, QueryRunner } from "typeorm";

export class AddupvoteCountToComment1728803559720 implements MigrationInterface {
    name = 'AddupvoteCountToComment1728803559720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "upvoteCount" integer NOT NULL DEFAULT '0'`);    
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "upvoteCount"`);
    }

}
