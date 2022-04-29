import { truncate } from "fs";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from 'next/router';
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "../../../components/container";
import TicketWithDetailsStack from "../../../components/ticket/ticket-with-details-stack";
import TicketController from "../../../controllers/ticket-controller";
import { ironSessionOptions } from "../../../lib/session";
import { Ticket } from "../../../models/ticket/ticket";


interface AllTicketsProps{
    allTickets: Ticket[]
}

const Page:NextPage<AllTicketsProps> = (props) => {

    const router = useRouter();
    const { id } = router.query;

    const [allTickets, setAllTickets] = useState<Ticket[]>();
    const [input, setInput]  = useState('')
    const [output, setOutput] = useState<Ticket[] | undefined>();

    useEffect(() => {
      setAllTickets(props.allTickets);
      setOutput(props.allTickets);
      console.log(props.allTickets);
    }, [allTickets]);

    useEffect(() => {
      setOutput([])
      if(input === ""){
        setOutput(allTickets)
        return
      }

      const query: String[] = input.trim().split(" ");

      allTickets?.filter(val => {
        let data: String = `${val.admin?.username.toLowerCase()} ${val.ticketDetails[0].title.toLowerCase()} ${val.ticketStatus.toLowerCase()} ${val.createdAt.toLocaleString('en-GB').toLowerCase()} ${val.doneAt != null ? val.doneAt.toLocaleString('en-GB').toLowerCase() : ''}`
        
        for(var content of val.ticketDetails){
          data += ` ${content.content}`
        }

        let flag: boolean[] = []
        console.log(data)
        console.log(query)

        for(var word of query){
            if(data.toString().toLowerCase().includes(word.toLowerCase())){
              flag.push(true)
            } else{
              flag.push(false)
            }
        }

        let result = new Set(flag)
        console.log(new Set(flag))

        if(result.size === 1 && result.has(true)){
          setOutput(output => [...output ?? [], val])
        }
      })

      // setOutput(output => output?.filter((value, index, self) => {
      //   return self.indexOf(value) === index
      // }))

    }, [input])

    return (
        <Container className="">  
          {output ? (
            <div>
                <div className='mb-6'>
                    <input onChange={e => setInput(e.target.value)}  className='w-full max-w-lg py-2 px-4 border-2 border-gray-300 rounded-md' type="text" placeholder='Filter by Title, Content, Status, Created At, and Done At'/>
                </div>
    
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 justify-center">
                <TicketWithDetailsStack
                  title={'Ticket History'}
                  tickets={output}
                  className={'w-full'}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </Container>
      );
}

export default Page;

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      return {
        props: req.session.user
          ? {
                allTickets: await TicketController.getAllTickets(
                req.session.user
              ),
            }
          : {},
      };
    },
    ironSessionOptions
  );