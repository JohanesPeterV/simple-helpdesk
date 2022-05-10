-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('PENDING', 'ONGOING', 'CLOSED');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resignedAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketHeader" (
    "id" TEXT NOT NULL,
    "adminId" TEXT,
    "creatorEmail" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "ticketStatus" "TicketStatus" NOT NULL DEFAULT E'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doneAt" TIMESTAMP(3),
    "solveDetail" TEXT,

    CONSTRAINT "TicketHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketDetail" (
    "id" TEXT NOT NULL,
    "creatorEmail" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "ticketHeaderId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailMessageId" TEXT,

    CONSTRAINT "TicketDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "TicketHeader" ADD CONSTRAINT "TicketHeader_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketDetail" ADD CONSTRAINT "TicketDetail_ticketHeaderId_fkey" FOREIGN KEY ("ticketHeaderId") REFERENCES "TicketHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
