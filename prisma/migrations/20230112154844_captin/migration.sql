/*
  Warnings:

  - Added the required column `captinId` to the `UserTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userteam` ADD COLUMN `allIn` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `captinId` INTEGER NOT NULL,
    ADD COLUMN `teamFan` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tripleCaptin` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_captinId_fkey` FOREIGN KEY (`captinId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
