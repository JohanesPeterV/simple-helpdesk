-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketHeader" (
    "id" TEXT NOT NULL,
    "creatorEmail" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "ticketHeaderId" INTEGER NOT NULL,
    "ticketStatusId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "solveDetail" TEXT NOT NULL,

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
    "createdAt" TIMESTAMP(3) NOT NULL,
    "emailMessageId" TEXT NOT NULL,

    CONSTRAINT "TicketDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TicketStatus_pkey" PRIMARY KEY ("id")
);
