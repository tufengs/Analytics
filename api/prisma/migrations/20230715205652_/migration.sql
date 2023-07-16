-- AlterTable
ALTER TABLE "user" ADD COLUMN     "validated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Credential" (
    "id" UUID NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);
