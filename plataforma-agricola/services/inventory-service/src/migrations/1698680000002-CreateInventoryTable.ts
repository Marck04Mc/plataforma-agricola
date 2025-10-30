import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryTable1698680000002 implements MigrationInterface {
    name = 'CreateInventoryTable1698680000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS inventory (
              "productId" varchar PRIMARY KEY,
              "productName" varchar,
              "stock" integer NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS inventory;`);
    }

}
