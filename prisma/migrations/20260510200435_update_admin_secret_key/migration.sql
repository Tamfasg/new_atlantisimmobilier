/*
  Warnings:

  - You are about to drop the column `keyHash` on the `AdminSecretKey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `AdminSecretKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `AdminSecretKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `AdminSecretKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminSecretKey" DROP COLUMN "keyHash",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdminSecretKey_name_key" ON "AdminSecretKey"("name");
