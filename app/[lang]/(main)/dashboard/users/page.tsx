import BreadCrumb from '@/components/breadcrumbs'
import { UserClient } from '@/components/main/table/users-table/user-client'
import { users } from '@/constants/data'
import React from 'react'

export default function Users() {
  return (
    <div className='flex-1 space-y-4  p-4 pt-6 md:p-8'>
      <BreadCrumb />
      <UserClient data={users}/>
    </div>
  )
}
