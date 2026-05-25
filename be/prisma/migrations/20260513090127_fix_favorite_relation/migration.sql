/*
  Warnings:

  - You are about to drop the column `created_at` on the `admin_users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `admin_users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `admin_users` table. All the data in the column will be lost.
  - You are about to drop the column `approved_by` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `direction` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `expired_at` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `furniture` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `is_approved` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `legal_status` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `properties` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `admin_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_property_id_fkey`;

-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `project_images` DROP FOREIGN KEY `project_images_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `properties_approved_by_fkey`;

-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `properties_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `properties_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `property_images` DROP FOREIGN KEY `property_images_property_id_fkey`;

-- DropIndex
DROP INDEX `properties_approved_by_fkey` ON `properties`;

-- DropIndex
DROP INDEX `properties_created_at_idx` ON `properties`;

-- DropIndex
DROP INDEX `properties_status_idx` ON `properties`;

-- DropIndex
DROP INDEX `properties_type_id_idx` ON `properties`;

-- DropIndex
DROP INDEX `properties_user_id_idx` ON `properties`;

-- AlterTable
ALTER TABLE `admin_users` DROP COLUMN `created_at`,
    DROP COLUMN `role`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `properties` DROP COLUMN `approved_by`,
    DROP COLUMN `created_at`,
    DROP COLUMN `direction`,
    DROP COLUMN `expired_at`,
    DROP COLUMN `furniture`,
    DROP COLUMN `is_approved`,
    DROP COLUMN `is_featured`,
    DROP COLUMN `legal_status`,
    DROP COLUMN `type_id`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `approvedBy` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE `users` DROP COLUMN `created_at`,
    DROP COLUMN `role`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `favorites`;

-- DropTable
DROP TABLE `news`;

-- DropTable
DROP TABLE `project_images`;

-- DropTable
DROP TABLE `projects`;

-- DropTable
DROP TABLE `property_images`;

-- DropTable
DROP TABLE `property_types`;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Project_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `News_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `admin_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `admin_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
