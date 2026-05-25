/*
  Warnings:

  - You are about to drop the column `slug` on the `Project` table. All the data in the column will be lost.
  - Added the required column `address` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investor` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Project_slug_key` ON `Project`;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `slug`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactPhone` VARCHAR(191) NULL,
    ADD COLUMN `investor` VARCHAR(191) NOT NULL,
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
