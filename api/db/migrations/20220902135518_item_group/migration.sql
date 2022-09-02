/*
  Warnings:

  - You are about to drop the `ItemStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StorageLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `itemStatusId` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `loanId` on the `LoanHistory` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `block` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemStatus` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `LoanHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ItemStatus_itemId_key";

-- DropIndex
DROP INDEX "StorageLocation_itemId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemStatus";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StorageLocation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ItemGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loanedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturnAt" DATETIME NOT NULL,
    "returnedAt" DATETIME,
    "remarks" TEXT,
    "userId" INTEGER NOT NULL,
    "loanHistoryId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_loanHistoryId_fkey" FOREIGN KEY ("loanHistoryId") REFERENCES "LoanHistory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("expectedReturnAt", "id", "loanHistoryId", "loanedAt", "remarks", "returnedAt", "userId") SELECT "expectedReturnAt", "id", "loanHistoryId", "loanedAt", "remarks", "returnedAt", "userId" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE UNIQUE INDEX "Loan_userId_key" ON "Loan"("userId");
CREATE UNIQUE INDEX "Loan_loanHistoryId_key" ON "Loan"("loanHistoryId");
CREATE UNIQUE INDEX "Loan_itemId_key" ON "Loan"("itemId");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "itemStatus" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "floorSection" TEXT,
    "room" TEXT,
    "subIndex" TEXT,
    "thumbnailUrl" TEXT
);
INSERT INTO "new_Item" ("id", "name", "thumbnailUrl") SELECT "id", "name", "thumbnailUrl" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_LoanHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "LoanHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LoanHistory" ("id") SELECT "id" FROM "LoanHistory";
DROP TABLE "LoanHistory";
ALTER TABLE "new_LoanHistory" RENAME TO "LoanHistory";
CREATE UNIQUE INDEX "LoanHistory_itemId_key" ON "LoanHistory"("itemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
