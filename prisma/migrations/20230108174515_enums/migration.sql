/*
  Warnings:

  - The values [topLane] on the enum `Players_lane` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `players` MODIFY `lane` ENUM('toplane', 'jungle', 'midlane', 'botlane', 'support') NOT NULL;
