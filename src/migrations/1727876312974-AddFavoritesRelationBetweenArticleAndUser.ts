import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesRelationBetweenArticleAndUser1727876312974 implements MigrationInterface {
    name = 'AddFavoritesRelationBetweenArticleAndUser1727876312974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_favorites_stories" ("usersId" integer NOT NULL, "storiesId" integer NOT NULL, CONSTRAINT "PK_c06ae52c67cd58a18622180e23c" PRIMARY KEY ("usersId", "storiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d3946368ad3a14569bbf184d2" ON "users_favorites_stories" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cbf7ad69a3bd6241ef3fd2a1a2" ON "users_favorites_stories" ("storiesId") `);
        await queryRunner.query(`ALTER TABLE "users_favorites_stories" ADD CONSTRAINT "FK_3d3946368ad3a14569bbf184d27" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_stories" ADD CONSTRAINT "FK_cbf7ad69a3bd6241ef3fd2a1a25" FOREIGN KEY ("storiesId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_stories" DROP CONSTRAINT "FK_cbf7ad69a3bd6241ef3fd2a1a25"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_stories" DROP CONSTRAINT "FK_3d3946368ad3a14569bbf184d27"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbf7ad69a3bd6241ef3fd2a1a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d3946368ad3a14569bbf184d2"`);
        await queryRunner.query(`DROP TABLE "users_favorites_stories"`);
    }

}
