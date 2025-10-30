import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1698680000000 implements MigrationInterface {
    name = 'CreateOrdersTable1698680000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS orders (
              "orderId" varchar PRIMARY KEY,
              "payload" jsonb NOT NULL,
              "createdAt" varchar NOT NULL,
              "status" varchar NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS orders;`);
    }

}
