/*
  Warnings:

  - Added the required column `week` to the `PlayerKDA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `playerkda` ADD COLUMN `week` INTEGER NOT NULL;
