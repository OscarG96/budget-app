/*
  Warnings:

  - You are about to drop the column `month` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Budget` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId,categoryId]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Budget_authorId_categoryId_month_year_key";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "month",
DROP COLUMN "year";

-- CreateIndex
CREATE UNIQUE INDEX "Budget_authorId_categoryId_key" ON "Budget"("authorId", "categoryId");
