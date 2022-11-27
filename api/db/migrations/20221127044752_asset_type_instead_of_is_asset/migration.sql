/*
  Warnings:

  - You are about to drop the column `isAsset` on the `Item` table. All the data in the column will be lost.
  - Added the required column `assetType` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemStatus" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "subIndex" TEXT,
    "remarks" TEXT,
    "imageBlobBase64" TEXT
);
INSERT INTO "new_Item" ("block", "floor", "id", "imageBlobBase64", "itemStatus", "name", "remarks", "room", "subIndex") SELECT "block", "floor", "id", "imageBlobBase64", "itemStatus", "name", "remarks", "room", "subIndex" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
