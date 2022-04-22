import { prisma } from '../../lib/prisma';
import { Admin, TicketHeader, TicketStatus } from '@prisma/client';

const argon2 = require('argon2');

let adminList: string[];

interface TicketDetailSeed {
  title: string;
  content: string;
  creatorName: string;
  creatorEmail: string;
  emailMessageId: string | null;
}

interface TicketSeed {
  ticketStatus: TicketStatus;
  solveDetail: string | null;
  creatorEmail: string;
  creatorName: string;
  ticketDetails: TicketDetailSeed[];
}

const ticketList: TicketSeed[] = [
  {
    ticketStatus: TicketStatus.PENDING,
    solveDetail: null,
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'bug di messier',
        content: 'Messiernya pas di buka gabisa clock in dan gabisa clockout',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.ONGOING,
    solveDetail: null,
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'keperluan ticket system rdt',
        content: 'RDT perlu ticketing system buat request masalah',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail:
      'Permasalahan ini seharusnya dilaporkan secara langsung kepada pihak HC.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'hc problem',
        content: 'hc gw gbs clock in clockout broo',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail: 'Closed Ticket 1.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'Closed Ticket 1',
        content: 'Closed Ticket Dummy Data',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail: 'Closed Ticket 2.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'Closed Ticket 2',
        content: 'Closed Ticket Dummy Data',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail: 'Closed Ticket 3.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'Closed Ticket 3',
        content: 'Closed Ticket Dummy Data',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail: 'Closed Ticket 4.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'Closed Ticket 4',
        content: 'Closed Ticket Dummy Data',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail: 'Closed Ticket 5.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'Closed Ticket 5',
        content: 'Closed Ticket Dummy Data',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
  {
    ticketStatus: TicketStatus.CLOSED,
    solveDetail: 'Closed Ticket 6.',
    creatorEmail: 'johanes.vincentius@binus.ac.id',
    creatorName: 'Johanes Peter Vincentius',
    ticketDetails: [
      {
        title: 'Closed Ticket 6',
        content: 'Closed Ticket Dummy Data',
        creatorName: 'rdt',
        creatorEmail: 'rdt@gmail.com',
        emailMessageId: null,
      },
    ],
  },
];

async function insertHeader(ticket: TicketSeed) {
  const ticketHeader = await prisma.ticketHeader.create({
    data: {
      adminId:
        ticket.ticketStatus === TicketStatus.PENDING
          ? null
          : adminList[Math.floor(Math.random() * adminList.length)],
      solveDetail: null,
      creatorEmail: ticket.creatorEmail,
      creatorName: ticket.creatorName,
      ticketStatus: ticket.ticketStatus,
    },
  });
  return ticketHeader;
}

async function insertDetails(
  ticketHeader: TicketHeader,
  ticketDetails: TicketDetailSeed[]
) {
  ticketDetails.forEach((ticketDetailSeed) => {
    prisma.ticketDetail
      .create({
        data: {
          ticketHeaderId: ticketHeader.id,
          creatorName: ticketDetailSeed.creatorName,
          creatorEmail: ticketDetailSeed.creatorEmail,
          title: ticketDetailSeed.title,
          content: ticketDetailSeed.content,
          emailMessageId: null,
        },
      })
      .then();
  });
}

async function insertTicket(ticketSeed: TicketSeed) {
  const ticketHeader = await insertHeader(ticketSeed);
  await insertDetails(ticketHeader, ticketSeed.ticketDetails);
}

async function refreshTicket() {
  await prisma.ticketDetail.deleteMany({});
  await prisma.ticketHeader.deleteMany({});
}

export default async function seedTickets(adminListParameter: string[]) {
  await refreshTicket();
  adminList = adminListParameter;
  ticketList.forEach(insertTicket);
}
