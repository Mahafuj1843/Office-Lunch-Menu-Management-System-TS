/*
  Warnings:

  - Added the required column `desc` to the `Menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menus" ADD COLUMN     "desc" TEXT NOT NULL;
