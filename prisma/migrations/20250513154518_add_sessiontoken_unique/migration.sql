/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Alive" TEXT NOT NULL DEFAULT 'Alive',
    "Dead" TEXT NOT NULL DEFAULT 'Dead',
    "Draft" TEXT NOT NULL DEFAULT 'Draft'
);

-- CreateTable
CREATE TABLE "_CharacterToStatus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CharacterToStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Character" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CharacterToStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "Status" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToStatus_AB_unique" ON "_CharacterToStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToStatus_B_index" ON "_CharacterToStatus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
