/*
  Warnings:

  - You are about to drop the column `slug` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `property_types` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `properties_slug_key` ON `properties`;

-- DropIndex
DROP INDEX `property_types_slug_key` ON `property_types`;

-- AlterTable
ALTER TABLE `properties` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `property_types` DROP COLUMN `slug`;
