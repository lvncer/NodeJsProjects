-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "single" INTEGER,
    "double" INTEGER,
    "delux" INTEGER,
    "Ioc" INTEGER
);
INSERT INTO "new_Hotel" ("Ioc", "delux", "double", "id", "name", "single") SELECT "Ioc", "delux", "double", "id", "name", "single" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
