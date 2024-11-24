// "use client"
import React from 'react'
//import {useActionState} from 'react'
import { createHaiku } from '../../actions/UserController'
import { getUserFromCookie } from '../../lib/getUser'
import { redirect } from 'next/navigation'
import HaikuForm from '../../components/HaikuForm'

export default async function page() {
  const user = await getUserFromCookie()
  if (!user) {
    return redirect("/")
  }
  
  return (
    <>
      <h2 className='text-center text-2xl text-gray-600 mb-5'>Create Your Hello World </h2>
      <HaikuForm />
    </>
  )
}