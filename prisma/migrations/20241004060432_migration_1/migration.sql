/*
  Warnings:

  - You are about to drop the column `notes` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `description` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "notes",
ADD COLUMN     "description" TEXT NOT NULL;
