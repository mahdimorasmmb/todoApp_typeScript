-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "task" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "handNotes" TEXT,
    "description" TEXT
);
