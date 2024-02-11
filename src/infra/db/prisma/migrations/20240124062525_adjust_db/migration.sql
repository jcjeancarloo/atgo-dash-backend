-- CreateEnum
CREATE TYPE "Resources" AS ENUM ('BENEFITS', 'SALES', 'CAMPAIGNS');

-- CreateTable
CREATE TABLE "platform_kind" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_kind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platforms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "platformKindId" TEXT NOT NULL,
    "resources" "Resources"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platformKindId_fkey" FOREIGN KEY ("platformKindId") REFERENCES "platform_kind"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
