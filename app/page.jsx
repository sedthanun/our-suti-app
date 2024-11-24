import Link from 'next/link'
import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { getUserFromCookie } from '../lib/getUser'
import Dashboard from "../components/Dashboard"
//comments

export default async function page() {
  const user = await getUserFromCookie()
  return (
    <>
    {user && <Dashboard user={user} />}
    {!user && (
      <>
        <p className='text-center text-2xl text-gray-600 mb-5'>Don&rsquo;t have an accont ? <strong>Create One</strong></p>
        <RegisterForm />
      </>
    )}
      
    </>
  )
}
