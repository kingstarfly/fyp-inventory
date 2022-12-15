/*
  Warnings:

  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UserRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpireAt" DATETIME,
    "webAuthnChallenge" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "hashedPassword", "id", "lastName", "resetToken", "resetTokenExpireAt", "salt", "webAuthnChallenge") SELECT "createdAt", "email", "firstName", "hashedPassword", "id", "lastName", "resetToken", "resetTokenExpireAt", "salt", "webAuthnChallenge" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_webAuthnChallenge_key" ON "User"("webAuthnChallenge");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_userId_key" ON "UserRole"("name", "userId");
