-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "Posts" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Content" TEXT NOT NULL,
    "Title" TEXT,
    "Slug" TEXT NOT NULL,
    "Likes" INTEGER NOT NULL DEFAULT 0,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Posts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
