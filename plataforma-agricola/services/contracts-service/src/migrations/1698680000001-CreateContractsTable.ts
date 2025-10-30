import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContractsTable1698680000001 implements MigrationInterface {
    name = 'CreateContractsTable1698680000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS contracts (
              "contractId" varchar PRIMARY KEY,
              "producerId" varchar NOT NULL,
              "buyerId" varchar NOT NULL,
              "terms" jsonb,
              "signatures" jsonb,
              "status" varchar NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS contracts;`);
    }

}
