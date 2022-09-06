/*
  Warnings:

  - You are about to drop the column `floorSection` on the `Item` table. All the data in the column will be lost.
  - Made the column `room` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemStatus" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "subIndex" TEXT,
    "description" TEXT,
    "thumbnailUrl" TEXT
);
INSERT INTO "new_Item" ("block", "category", "description", "floor", "id", "itemStatus", "name", "room", "subIndex", "thumbnailUrl") SELECT "block", "category", "description", "floor", "id", "itemStatus", "name", "room", "subIndex", "thumbnailUrl" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
