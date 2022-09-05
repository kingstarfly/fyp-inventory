/*
  Warnings:

  - You are about to drop the `ItemGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemGroup";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemStatus" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "floorSection" TEXT,
    "room" TEXT,
    "subIndex" TEXT,
    "description" TEXT,
    "thumbnailUrl" TEXT
);
INSERT INTO "new_Item" ("block", "floorSection", "id", "itemStatus", "name", "room", "subIndex", "thumbnailUrl") SELECT "block", "floorSection", "id", "itemStatus", "name", "room", "subIndex", "thumbnailUrl" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
