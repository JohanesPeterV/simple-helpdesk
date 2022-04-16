import type { NextPage } from 'next'
import { FormEventHandler, useState } from 'react'
import Router from 'next/router'
import Container from '../../components/container'
import Input from '../../components/input'
import Button from '../../components/button'
import { toast } from 'react-hot-toast'
import TicketService from '../../services/ticket-service'
import { CreateTicketDTO } from '../../models/ticket/create-ticket-dto'

const Create: NextPage = ({}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const ticket: CreateTicketDTO = {
      title: title,
      content: content,
    }
    await toast.promise(TicketService.create(ticket), {
      loading: 'Creating Ticket...',
      success: 'Create tickets success',
      error: 'Create tickets failed. Please try again.',
    })
    await Router.push('/')
  }
  return (
    <Container>
      <form onSubmit={onSubmit} className="space-y-8 divide-y divide-gray-200 ">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Create Ticket
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Sumbit a request by creating a ticket.
            </p>
          </div>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <Input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                  autoComplete="given-name"
                  className="max-w-lg border-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md py-2 px-2"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  onChange={(e) => {
                    setContent(e.target.value)
                  }}
                  className="max-w-lg border-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md py-2 px-2"
                  defaultValue={''}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Describe your need in your ticket.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          isLoading={false}
          type="submit"
          className={'hover:bg-sky-700 bg-sky-600 text-white'}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default Create
