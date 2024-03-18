/*
  Warnings:

  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priority";
ALTER TABLE "Task" ADD COLUMN     "priority_enum" "Priority";
