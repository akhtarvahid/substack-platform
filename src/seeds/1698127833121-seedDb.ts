import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDB1698127833122 implements MigrationInterface {
     name = 'SeedDB1698127833122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // keep camel case names in quotes
            `INSERT INTO tags ("tagName") VALUES ('nestjs'), ('nodejs'), ('java')`
        );

        await queryRunner.query(
            `INSERT INTO users (email, username, bio, image, password) VALUES ('akhtar@gmail.com', 'Akhtar', 'seeding - initial data generation', '', '$2b$10$sCSX0Z6PjjnbbWHGrbEFgOu3PGGah9t5gUlOnuWEtWe9VyI3x3TRC')`
        );
        
        await queryRunner.query(
            `INSERT INTO stories (slug, title, description, "tagList", "authorId") VALUES ('java-sxb-blog', 'java blog', 'Follow official documentation', 'java,backend', 1), ('slug-2', 'slug-title-2', 'slug description 2', 'backend,nodejs', 1)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}