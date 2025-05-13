/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CharacterToStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_CharacterToStatus_B_index";

-- DropIndex
DROP INDEX "_CharacterToStatus_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Status";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CharacterToStatus";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 3,
    "currentHp" INTEGER NOT NULL,
    "maxHp" INTEGER NOT NULL,
    "str" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "wis" INTEGER NOT NULL,
    "char" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ALIVE',
    "userId" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Character" ("char", "class", "con", "currentHp", "dex", "id", "int", "level", "maxHp", "name", "raceId", "str", "userId", "wis") SELECT "char", "class", "con", "currentHp", "dex", "id", "int", "level", "maxHp", "name", "raceId", "str", "userId", "wis" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
