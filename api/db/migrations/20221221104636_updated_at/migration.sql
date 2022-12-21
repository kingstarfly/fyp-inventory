/*
  Warnings:

  - You are about to drop the column `modifiedAt` on the `Item` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legacyId" TEXT,
    "name" TEXT NOT NULL,
    "itemStatus" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "subIndex" TEXT,
    "remarks" TEXT,
    "imageBlobBase64" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Item" ("assetType", "block", "createdAt", "floor", "id", "imageBlobBase64", "itemStatus", "legacyId", "name", "remarks", "room", "subIndex") SELECT "assetType", "block", "createdAt", "floor", "id", "imageBlobBase64", "itemStatus", "legacyId", "name", "remarks", "room", "subIndex" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_legacyId_key" ON "Item"("legacyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
