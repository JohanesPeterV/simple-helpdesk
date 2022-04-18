import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Container from '../components/container'
import { ironSessionOptions } from '../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { TicketGrouping } from '../models/ticket/ticket-grouping'
import TicketController from '../controllers/ticket-controller'
import TicketStack from '../components/ticket/ticket-stack'
import { If } from 'react-if'

interface HomeProps {
  ticketGrouping: TicketGrouping
}

const Home: NextPage<HomeProps> = (props) => {
  const [ticketGrouping, setTicketGrouping] = useState<TicketGrouping>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTicketGrouping(props.ticketGrouping)
    setLoading(false)
  }, [])

  return (
    <Container className="">
      <If condition={isLoading}>loading bro masihhhhh</If>
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 justify-start">
        <TicketStack
          title={'Ongoing Tickets'}
          tickets={props.ticketGrouping.ongoingTickets}
        />
        <TicketStack
          title={'Pending Tickets'}
          tickets={props.ticketGrouping.pendingTickets}
        />
      </div>
    </Container>
  )
}
export default Home

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: req.session.user
        ? {
            ticketGrouping: await TicketController.getTicketsGroup(
              req.session.user
            ),
          }
        : {},
    }
  },
  ironSessionOptions
)
