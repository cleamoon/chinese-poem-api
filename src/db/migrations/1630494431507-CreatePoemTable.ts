import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePoemTable1630494431507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: "poem",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "poet",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "line1",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "line2",
                    type: "varchar",
                    isNullable: false,
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.dropTable("poem");
    }

}
