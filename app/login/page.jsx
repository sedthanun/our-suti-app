"use client"
import React from 'react'
import {useActionState} from 'react'
import { login } from '../../actions/UserController'

export default function page() {
  const [formState, formAction] = useActionState(login, {})
  return (
    <>
      <h2 className='text-center text-2xl text-gray-600 mb-5'>Log In</h2>
      <form action={formAction} className='max-w-xs mx-auto'>
        <div className="mb3">
        <input name = 'username' autoComplete = 'off' type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" />
        {formState.errors?.username && (
            <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{formState.errors?.username}</span>
          </div>
        )}
        </div>
        <div className="mb3 mt-5">
        <input name = 'password' autoComplete = 'off' type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
        {formState.errors?.password && (
            <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{formState.errors?.password}</span>
          </div>
        )}
        </div>
        <button className='btn btn-primary mt-5'>Submit</button>
    </form>
    </>
  )
}
