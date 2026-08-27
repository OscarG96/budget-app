/*
  Warnings:

  - Changed the type of `frequency` on the `recurring_expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "recurring_expenses" DROP COLUMN "frequency",
ADD COLUMN     "frequency" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RecurrenceFrequency";
