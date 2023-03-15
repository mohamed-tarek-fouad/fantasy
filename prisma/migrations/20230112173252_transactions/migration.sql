/*
  Warnings:

  - You are about to drop the column `allIn` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `teamFan` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `transfers` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tripleCaptin` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `allIn`,
    DROP COLUMN `points`,
    DROP COLUMN `teamFan`,
    DROP COLUMN `transfers`,
    DROP COLUMN `tripleCaptin`;

-- AlterTable
ALTER TABLE `userteam` ADD COLUMN `allInStatus` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `teamFanStatus` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `transfers` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `tripleCaptinStatus` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `allIn` INTEGER NOT NULL DEFAULT 1,
    MODIFY `teamFan` INTEGER NOT NULL DEFAULT 1,
    MODIFY `tripleCaptin` INTEGER NOT NULL DEFAULT 1;
