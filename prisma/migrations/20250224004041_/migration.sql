/*
  Warnings:

  - The `text` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "text",
ADD COLUMN     "text" TEXT[];
