/*
  Warnings:

  - The values [NONE,LOW,MEDIUM,HIGH,URGENT] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Priority" ADD VALUE 'none';
ALTER TYPE "Priority" ADD VALUE 'low';
ALTER TYPE "Priority" ADD VALUE 'medium';
ALTER TYPE "Priority" ADD VALUE 'high';
ALTER TYPE "Priority" ADD VALUE 'urgent';
ALTER TYPE "Priority"DROP VALUE 'NONE';
ALTER TYPE "Priority"DROP VALUE 'LOW';
ALTER TYPE "Priority"DROP VALUE 'MEDIUM';
ALTER TYPE "Priority"DROP VALUE 'HIGH';
ALTER TYPE "Priority"DROP VALUE 'URGENT';
