/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Score_name_key" ON "Score"("name");
