"use client"
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page =  () => {
    const searchParams = useSearchParams()
    const session =  useSession();
    const project = searchParams.get("project")
  return (
    <div className='container mx-auto'>
      <h1>{project}</h1>
    </div>
  )
}

export default Page
