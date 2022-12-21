/*
  Warnings:

  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoanHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCredential` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `webAuthnChallenge` on the `User` table. All the data in the column will be lost.
  - Added the required column `legacyId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Loan_itemId_key";

-- DropIndex
DROP INDEX "Loan_loanHistoryId_key";

-- DropIndex
DROP INDEX "Loan_userId_key";

-- DropIndex
DROP INDEX "LoanHistory_itemId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Loan";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LoanHistory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserCredential";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpireAt" DATETIME,
    "roles" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "hashedPassword", "id", "resetToken", "resetTokenExpireAt", "roles", "salt") SELECT "createdAt", "email", "hashedPassword", "id", "resetToken", "resetTokenExpireAt", "roles", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legacyId" TEXT NOT NULL,
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
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Item" ("assetType", "block", "floor", "id", "imageBlobBase64", "itemStatus", "name", "remarks", "room", "subIndex") SELECT "assetType", "block", "floor", "id", "imageBlobBase64", "itemStatus", "name", "remarks", "room", "subIndex" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_legacyId_key" ON "Item"("legacyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
