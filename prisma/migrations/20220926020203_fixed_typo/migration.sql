/*
  Warnings:

  - You are about to drop the column `imageSrg` on the `Ring` table. All the data in the column will be lost.
  - Added the required column `imageSrc` to the `Ring` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ring" DROP COLUMN "imageSrg",
ADD COLUMN     "imageSrc" TEXT NOT NULL;
