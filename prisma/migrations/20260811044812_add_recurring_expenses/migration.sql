/*
  Warnings:

  - You are about to drop the column `month` on the `recurring_expenses` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `recurring_expenses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "recurring_expenses_authorId_categoryId_month_year_key";

-- AlterTable
ALTER TABLE "recurring_expenses" DROP COLUMN "month",
DROP COLUMN "year";
