/*
  Warnings:

  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team1Id_fkey`;

-- DropForeignKey
ALTER TABLE `matches` DROP FOREIGN KEY `Matches_team2Id_fkey`;

-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `Players_teamId_fkey`;

-- AlterTable
ALTER TABLE `matches` MODIFY `team1Id` VARCHAR(191) NOT NULL,
    MODIFY `team2Id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `players` MODIFY `teamId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `team` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`teamName`);

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`teamName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team1Id_fkey` FOREIGN KEY (`team1Id`) REFERENCES `Team`(`teamName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team2Id_fkey` FOREIGN KEY (`team2Id`) REFERENCES `Team`(`teamName`) ON DELETE RESTRICT ON UPDATE CASCADE;
