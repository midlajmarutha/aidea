"use client"
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import NewProjectProgress from './NewProjectProgress'
import AddSite from './AddSite'
import EmbeddScript from './EmbeddScript'
import EmbedScript from './EmbedScript'

const NewProjectCard = () => {
    const searchParams = useSearchParams()
    const [setupStep, setSetupStep] = useState(searchParams.get("step"));
    const code = `<script src="https://cdn.aidea.in/chatbot/config/chatsupport.min.js"
data-domain="your-domain.com" data-clientid="hHeo38dLMLde#9sdl3mocdIDje9jcdLLdsw1"
defer></script>`
  return (
    <div className="w-full h-screen flex items-center justify-center">
        
            <div className="lg:w-[464px] md:w-[368px]  flex flex-col items-center gap-4 p-12 rounded-xl  shadow-lg">
                <NewProjectProgress onboardingStep={setupStep} setOnboardingStep={setSetupStep}/>
                {
                  setupStep === "site" ? <AddSite/>: setupStep === "script" ? <EmbedScript code={code} language={'html'}/>: ''
                }
            </div>
        </div>
  )
}

export default NewProjectCard
