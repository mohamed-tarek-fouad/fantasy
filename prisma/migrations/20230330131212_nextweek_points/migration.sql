/*
  Warnings:

  - You are about to drop the column `budget` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `budget`;

-- AlterTable
ALTER TABLE `userteam` ADD COLUMN `budget` INTEGER NOT NULL DEFAULT 100000000,
    ADD COLUMN `nextWeekPoints` INTEGER NOT NULL DEFAULT 0;
