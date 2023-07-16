-- CreateEnum
CREATE TYPE "DashboardType" AS ENUM ('HEATMAP', 'KPI', 'GRAPH');

-- DropIndex
DROP INDEX "Credential_applicationId_key";

-- CreateTable
CREATE TABLE "Dashboard" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 200,
    "width" INTEGER NOT NULL DEFAULT 200,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardElement" (
    "id" UUID NOT NULL,
    "dashboardId" UUID NOT NULL,
    "dashboardType" "DashboardType" NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "DashboardElement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DashboardElement" ADD CONSTRAINT "DashboardElement_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "Dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
