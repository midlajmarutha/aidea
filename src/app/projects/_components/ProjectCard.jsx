import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const ProjectCard = ({projectInfo}) => {
  return (
    <Link href={`/dashboard?project=${projectInfo.id}`}>
    <div className='cursor-pointer'>
      <Card className="w-[300px]">
        <CardContent>
            <CardHeader>
                <div className='text-sm font-semibold'>
                    {projectInfo.domain}
                </div>
            </CardHeader>
            <CardDescription>
                {projectInfo.discription}
            </CardDescription>
        </CardContent>
      </Card>
    </div>
    </Link>

  )
}

export default ProjectCard
