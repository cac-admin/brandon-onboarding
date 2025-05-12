/*
  Warnings:

  - You are about to drop the `Pc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Name` on the `Feats` table. All the data in the column will be lost.
  - You are about to drop the column `halfFeat` on the `Feats` table. All the data in the column will be lost.
  - Added the required column `description` to the `Feats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Feats` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pc_userId_key";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pc";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Character" (
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
    "userId" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,
    CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Character_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "abilities" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Spells" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spells" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StatIncr" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raceId" INTEGER NOT NULL,
    "featId" INTEGER NOT NULL,
    "stat" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "StatIncr_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StatIncr_featId_fkey" FOREIGN KEY ("featId") REFERENCES "Feats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CharacterToFeats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CharacterToFeats_A_fkey" FOREIGN KEY ("A") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CharacterToFeats_B_fkey" FOREIGN KEY ("B") REFERENCES "Feats" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RaceToSpells" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RaceToSpells_A_fkey" FOREIGN KEY ("A") REFERENCES "Race" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RaceToSpells_B_fkey" FOREIGN KEY ("B") REFERENCES "Spells" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FeatsToSpells" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FeatsToSpells_A_fkey" FOREIGN KEY ("A") REFERENCES "Feats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FeatsToSpells_B_fkey" FOREIGN KEY ("B") REFERENCES "Spells" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Feats" ("id") SELECT "id" FROM "Feats";
DROP TABLE "Feats";
ALTER TABLE "new_Feats" RENAME TO "Feats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_key" ON "Character"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToFeats_AB_unique" ON "_CharacterToFeats"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToFeats_B_index" ON "_CharacterToFeats"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToSpells_AB_unique" ON "_RaceToSpells"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToSpells_B_index" ON "_RaceToSpells"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeatsToSpells_AB_unique" ON "_FeatsToSpells"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatsToSpells_B_index" ON "_FeatsToSpells"("B");
