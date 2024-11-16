import React from 'react'
import ProjectCardsContainer from './_components/ProjectCardsContainer'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex justify-end'>
            <Link href="projects/new?step=script">
                <Button>New project</Button>
            </Link>
        </div>
        <ProjectCardsContainer/>
    </div>
  )
}

export default page
