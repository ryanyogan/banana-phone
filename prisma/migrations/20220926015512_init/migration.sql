-- CreateTable
CREATE TABLE "Ring" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "imageSrg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ring_pkey" PRIMARY KEY ("id")
);
