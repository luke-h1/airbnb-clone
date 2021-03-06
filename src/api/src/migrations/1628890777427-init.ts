import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1628890777427 implements MigrationInterface {
  name = 'init1628890777427';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "image" character varying NOT NULL, "imageFileName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "properties" ("id" SERIAL NOT NULL, "title" character varying(20) NOT NULL, "creatorId" integer NOT NULL, "propertyType" character varying(15) NOT NULL, "image" character varying NOT NULL, "imageFileName" character varying NOT NULL, "beds" integer NOT NULL, "baths" integer NOT NULL, "bedrooms" integer NOT NULL, "description" character varying NOT NULL, "pricePerNight" integer NOT NULL, "address" character varying(20) NOT NULL, "amenities" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "properties" ADD CONSTRAINT "FK_6bf7f80b0dc8fecc1ccc6f7acc9" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "properties" DROP CONSTRAINT "FK_6bf7f80b0dc8fecc1ccc6f7acc9"`,
    );
    await queryRunner.query(`DROP TABLE "properties"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
