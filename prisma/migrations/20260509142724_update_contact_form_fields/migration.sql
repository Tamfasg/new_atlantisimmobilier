/*
  Warnings:

  - You are about to drop the column `folder` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `intret` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `sendAt` on the `ContactMessage` table. All the data in the column will be lost.
  - Added the required column `nom` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "folder",
DROP COLUMN "intret",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "project",
DROP COLUMN "sendAt",
ADD COLUMN     "interet" TEXT,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "projet" TEXT,
ADD COLUMN     "telephone" TEXT NOT NULL,
ADD COLUMN     "ville" TEXT,
ALTER COLUMN "message" DROP NOT NULL;
