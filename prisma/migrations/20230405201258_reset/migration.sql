-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `riotId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL DEFAULT 'null',
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerName` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `lane` ENUM('toplane', 'jungle', 'midlane', 'botlane', 'support') NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `teamName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `budget` INTEGER NOT NULL DEFAULT 100000000,
    `userId` INTEGER NOT NULL,
    `toplanerId` INTEGER NOT NULL,
    `junglerId` INTEGER NOT NULL,
    `midlanerId` INTEGER NOT NULL,
    `botlanerId` INTEGER NOT NULL,
    `supporterId` INTEGER NOT NULL,
    `sup1Id` INTEGER NOT NULL,
    `sup2Id` INTEGER NOT NULL,
    `captinId` INTEGER NOT NULL,
    `tripleCaptinStatus` BOOLEAN NOT NULL DEFAULT false,
    `allInStatus` BOOLEAN NOT NULL DEFAULT false,
    `teamFanStatus` BOOLEAN NOT NULL DEFAULT false,
    `points` INTEGER NOT NULL DEFAULT 0,
    `transfers` INTEGER NOT NULL DEFAULT 2,
    `tripleCaptin` INTEGER NOT NULL DEFAULT 1,
    `allIn` INTEGER NOT NULL DEFAULT 1,
    `teamFan` INTEGER NOT NULL DEFAULT 1,
    `nextWeekPoints` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `UserTeam_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `team1Id` VARCHAR(191) NOT NULL,
    `team2Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerKDA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `kills` INTEGER NOT NULL,
    `deathes` INTEGER NOT NULL,
    `assists` INTEGER NOT NULL,
    `visionScore` INTEGER NOT NULL,
    `MVB` BOOLEAN NOT NULL DEFAULT false,
    `cs` INTEGER NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Players` ADD CONSTRAINT `Players_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`teamName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_toplanerId_fkey` FOREIGN KEY (`toplanerId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_junglerId_fkey` FOREIGN KEY (`junglerId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_midlanerId_fkey` FOREIGN KEY (`midlanerId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_botlanerId_fkey` FOREIGN KEY (`botlanerId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_supporterId_fkey` FOREIGN KEY (`supporterId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_sup1Id_fkey` FOREIGN KEY (`sup1Id`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_sup2Id_fkey` FOREIGN KEY (`sup2Id`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_captinId_fkey` FOREIGN KEY (`captinId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team1Id_fkey` FOREIGN KEY (`team1Id`) REFERENCES `Team`(`teamName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_team2Id_fkey` FOREIGN KEY (`team2Id`) REFERENCES `Team`(`teamName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerKDA` ADD CONSTRAINT `PlayerKDA_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
