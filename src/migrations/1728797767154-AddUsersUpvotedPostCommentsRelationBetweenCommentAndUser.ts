import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersUpvotedPostCommentsRelationBetweenCommentAndUser1728797767154 implements MigrationInterface {
    name = 'AddUsersUpvotedPostCommentsRelationBetweenCommentAndUser1728797767154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_upvoted_post_comments" ("usersId" integer NOT NULL, "commentsId" integer NOT NULL, CONSTRAINT "PK_48a2f81cb248a62e9364dc4dadc" PRIMARY KEY ("usersId", "commentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_51247dcc022aadac09b79710cc" ON "users_upvoted_post_comments" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f214c443f7aabc7f9028d51f9" ON "users_upvoted_post_comments" ("commentsId") `);
        await queryRunner.query(`ALTER TABLE "users_upvoted_post_comments" ADD CONSTRAINT "FK_51247dcc022aadac09b79710ccf" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_upvoted_post_comments" ADD CONSTRAINT "FK_2f214c443f7aabc7f9028d51f9b" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_upvoted_post_comments" DROP CONSTRAINT "FK_2f214c443f7aabc7f9028d51f9b"`);
        await queryRunner.query(`ALTER TABLE "users_upvoted_post_comments" DROP CONSTRAINT "FK_51247dcc022aadac09b79710ccf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f214c443f7aabc7f9028d51f9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51247dcc022aadac09b79710cc"`);
        await queryRunner.query(`DROP TABLE "users_upvoted_post_comments"`);
    }

}
