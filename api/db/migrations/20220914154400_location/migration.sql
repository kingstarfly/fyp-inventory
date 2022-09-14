/*
  Warnings:

  - You are about to drop the `LocationNameMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LocationNameMapping";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locationName" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL
);
