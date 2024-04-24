import {
  CustomSession,
  authOptions
} from '@/app/api/auth/[...nextauth]/authOptions'
import BreadCrumb from '@/components/breadcrumbs'
import { getUsers } from '@/components/dataFetch/userFetch'
import UserClient from '@/components/main/table/users-table/user-client'
import { getServerSession } from 'next-auth'

export default async function Users() {
  const session = (await getServerSession(authOptions)) as CustomSession
  const users: APIResponseType<UserApiType> = await getUsers(
    session.user?.token!
  )
  return (
    <div className='flex-1 space-y-4  p-4 pt-6 md:p-8'>
      <BreadCrumb />
      <UserClient data={users} user={session.user!} />
    </div>
  )
}
