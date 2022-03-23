/*
  Warnings:

  - You are about to drop the column `ticketHeaderId` on the `TicketHeader` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TicketHeader" DROP COLUMN "ticketHeaderId";

-- AddForeignKey
ALTER TABLE "TicketHeader" ADD CONSTRAINT "TicketHeader_ticketStatusId_fkey" FOREIGN KEY ("ticketStatusId") REFERENCES "TicketStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketDetail" ADD CONSTRAINT "TicketDetail_ticketHeaderId_fkey" FOREIGN KEY ("ticketHeaderId") REFERENCES "TicketHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
