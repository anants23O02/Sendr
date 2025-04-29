/*
  Warnings:

  - The `messageWeeklyCount` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `messageMonthlyCount` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `messageYearlyCount` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `SenderContactNum` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "contacts" SET DATA TYPE BIGINT[],
DROP COLUMN "messageWeeklyCount",
ADD COLUMN     "messageWeeklyCount" TIMESTAMP(3)[],
DROP COLUMN "messageMonthlyCount",
ADD COLUMN     "messageMonthlyCount" TIMESTAMP(3)[],
DROP COLUMN "messageYearlyCount",
ADD COLUMN     "messageYearlyCount" TIMESTAMP(3)[],
DROP COLUMN "SenderContactNum",
ADD COLUMN     "SenderContactNum" BIGINT[];
