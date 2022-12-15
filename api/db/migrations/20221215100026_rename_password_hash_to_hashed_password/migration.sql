/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UserCredential" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "publicKey" BLOB NOT NULL,
    "transports" TEXT,
    "counter" BIGINT NOT NULL,
    CONSTRAINT "UserCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "roles" TEXT NOT NULL DEFAULT 'L1',
    "firstName" TEXT,
    "lastName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "id", "lastName", "resetToken", "resetTokenExpireAt", "roles", "salt") SELECT "createdAt", "email", "firstName", "id", "lastName", "resetToken", "resetTokenExpireAt", "roles", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_webAuthnChallenge_key" ON "User"("webAuthnChallenge");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
