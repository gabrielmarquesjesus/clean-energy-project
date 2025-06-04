/*
  Warnings:

  - Added the required column `contacted` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "contacted" BOOLEAN NOT NULL;
