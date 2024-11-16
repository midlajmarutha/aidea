import { Zain } from 'next/font/google'
import React from 'react'
const zain = Zain({weight:['700'], subsets:["latin"]})

const Header = () => {
  return (
    <div className='w-full p-6 px-32 flex justify-start'>
      <h1 className={`text-4xl ${zain.className}`}>aidea.in</h1>
    </div>
  )
}

export default Header
