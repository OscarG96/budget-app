/*
  Warnings:

  - You are about to drop the column `category` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId,categoryId,month,year]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyLimit` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `month` on the `Budget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "monthlyLimit" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "categories",
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlannedExpenses" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlannedExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlannedExpenses_authorId_categoryId_month_year_key" ON "PlannedExpenses"("authorId", "categoryId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_authorId_categoryId_month_year_key" ON "Budget"("authorId", "categoryId", "month", "year");

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedExpenses" ADD CONSTRAINT "PlannedExpenses_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlannedExpenses" ADD CONSTRAINT "PlannedExpenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
