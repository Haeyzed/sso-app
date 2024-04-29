'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { DataTable } from '@/components/data-table'
import { Heading } from '@/components/heading'
import { Separator } from '@/components/ui/separator'
import { laraEcho } from '@/lib/echo.config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useImmer } from 'use-immer'
import { UserForm } from '../../form/user-form'
import { columns } from './columns'
import { useTranslations } from 'next-intl'

interface UserTableProps {
  data: APIResponseType<UserApiType>
  user: CustomUser
}

export default function UserClient({ data, user }: UserTableProps) {
  const [users, setUsers] = useImmer<APIResponseType<UserApiType>>(data)
  const router = useRouter()
  const t = useTranslations('')

  useEffect(() => {
    laraEcho
      .channel('user-broadcast')
      .listen('UserBroadCastEvent', (event: any) => {
        console.log('The event is', event?.user)
        const user: UserApiType = event.user
        setUsers(users => {
          users.data = [user, ...users.data]
        })
        toast.success('New User added!', {
          description: 'Successfully added new user'
        })
      })
    return () => {
      laraEcho.leave('user-broadcast')
    }
  }, [setUsers])

  return (
    <>
      <div className='flex items-start justify-between'>
        <Heading
          title={`Users (${users.data.length ?? '0'})`}
          description='Manage users (Client side table functionalities.)'
        />
        <UserForm />
      </div>
      <Separator className='bg-card' />
      <DataTable searchKey='name' columns={columns} data={users.data} />
    </>
  )
}
