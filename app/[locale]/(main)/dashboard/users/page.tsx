import {
  CustomSession,
  authOptions
} from '@/app/api/auth/[...nextauth]/authOptions'
import BreadCrumb from '@/components/breadcrumbs'
import { getUsers } from '@/components/dataFetch/userFetch'
import UserTable from '@/components/main/table/users-table/user-table'
import { getServerSession } from 'next-auth'

export default async function Users() {
  const session = (await getServerSession(authOptions)) as CustomSession
  const users: APIResponseType<UserApiType> = await getUsers(
    session.user?.token!
  )
  return (
    <div className='flex-1 space-y-4  p-4 pt-6 md:p-8'>
      <BreadCrumb />
      <UserTable data={users} user={session.user!} />
    </div>
  )
}
