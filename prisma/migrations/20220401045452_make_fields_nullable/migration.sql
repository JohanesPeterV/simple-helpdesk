/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TicketStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TicketHeader" DROP CONSTRAINT "TicketHeader_adminId_fkey";

-- AlterTable
ALTER TABLE "TicketDetail" ALTER COLUMN "emailMessageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TicketHeader" ALTER COLUMN "solveDetail" DROP NOT NULL,
ALTER COLUMN "adminId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TicketStatus_name_key" ON "TicketStatus"("name");

-- AddForeignKey
ALTER TABLE "TicketHeader" ADD CONSTRAINT "TicketHeader_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
