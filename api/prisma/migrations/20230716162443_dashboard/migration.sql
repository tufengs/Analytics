/*
  Warnings:

  - You are about to drop the column `height` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Dashboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dashboard" DROP COLUMN "height",
DROP COLUMN "width";

-- AlterTable
ALTER TABLE "DashboardElement" ADD COLUMN     "height" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "width" INTEGER NOT NULL DEFAULT 200;
