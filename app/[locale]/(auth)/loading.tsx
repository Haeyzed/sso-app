import Loader from '@/components/loader'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader />
      {/* <div>Loading...</div> */}
    </div>
  )
}
