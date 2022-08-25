/*
  Warnings:

  - Added the required column `itemId` to the `ItemStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN "thumbnailUrl" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "ItemStatus_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemStatus" ("id", "status") SELECT "id", "status" FROM "ItemStatus";
DROP TABLE "ItemStatus";
ALTER TABLE "new_ItemStatus" RENAME TO "ItemStatus";
CREATE UNIQUE INDEX "ItemStatus_itemId_key" ON "ItemStatus"("itemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
