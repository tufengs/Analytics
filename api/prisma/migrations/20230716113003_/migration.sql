/*
  Warnings:

  - The required column `secret` was added to the `Credential` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "secret" UUID NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
