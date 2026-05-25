/*
  Warnings:

  - You are about to drop the column `slug` on the `News` table. All the data in the column will be lost.
  - Added the required column `excerpt` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `News_slug_key` ON `News`;

-- AlterTable
ALTER TABLE `News` DROP COLUMN `slug`,
    ADD COLUMN `excerpt` TEXT NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
