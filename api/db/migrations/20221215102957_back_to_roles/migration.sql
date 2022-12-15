/*
  Warnings:

  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roles` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserRole_name_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserRole";
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
    "webAuthnChallenge" TEXT,
    "roles" TEXT NOT NULL,
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
