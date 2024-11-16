import React from 'react'
import ProjectCard from './ProjectCard'

const projects = [
    {
        id:"trador",
        domain:"trador.com",
        url:"https://trador.com",
        description:"analytics platform for traders"
    },
    {
        id:"skillpark",
        domain:"skill-park.com",
        url:"https://skill-park.com",
        description:"Become building security enginear"
    },
    {
        id:"aidea",
        domain:"aidea.in",
        url:"https://aidea.in",
        description:"integrate ai chatbot into you website"
    }
]
const ProjectCardsContainer = () => {
  return (
    <div className='flex gap-4'>
      {projects.map((project,index)=>(
        <ProjectCard projectInfo={project} key={index}/>
      ))}
    </div>
  )
}

export default ProjectCardsContainer
