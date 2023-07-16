/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[applicationId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationId` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "applicationId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "applicationId" UUID,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Credential_applicationId_key" ON "Credential"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "user_applicationId_key" ON "user"("applicationId");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
