import React from 'react'
import { Input } from '../input'

const AddSite = () => {
  return (
    <div>
        <div className='flex h-10'>
            <div className='h-full border-l border-b border-t rounded-l-md p-2 text-base'>https://</div>
            <Input type="url" required className="rounded-l-none text-base p-2"/>
        </div>
    </div>
  )
}

export default AddSite
