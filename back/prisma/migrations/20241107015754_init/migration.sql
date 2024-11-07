-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "characterName" VARCHAR(255) NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startTime" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMPTZ(3) NOT NULL,
    "finalTime" VARCHAR(255) NOT NULL DEFAULT 'N/A',

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
