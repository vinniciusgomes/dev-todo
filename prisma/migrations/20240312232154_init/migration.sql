/*
  Warnings:

  - Added the required column `userId` to the `TodoTag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TodoTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TodoTag" ("color", "createdAt", "id", "name", "updatedAt") SELECT "color", "createdAt", "id", "name", "updatedAt" FROM "TodoTag";
DROP TABLE "TodoTag";
ALTER TABLE "new_TodoTag" RENAME TO "TodoTag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
