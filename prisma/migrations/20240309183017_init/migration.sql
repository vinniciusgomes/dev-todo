/*
  Warnings:

  - You are about to drop the `_TodoToTodoTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tagId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_TodoToTodoTag_B_index";

-- DropIndex
DROP INDEX "_TodoToTodoTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TodoToTodoTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATETIME,
    "priority" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "todoTagId" TEXT,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Todo_todoTagId_fkey" FOREIGN KEY ("todoTagId") REFERENCES "TodoTag" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("completed", "createdAt", "deleted", "dueDate", "id", "priority", "title", "updatedAt", "userId") SELECT "completed", "createdAt", "deleted", "dueDate", "id", "priority", "title", "updatedAt", "userId" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
