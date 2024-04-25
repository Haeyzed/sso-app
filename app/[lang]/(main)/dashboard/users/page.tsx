import {
  CustomSession,
  authOptions
} from '@/app/api/auth/[...nextauth]/authOptions'
import BreadCrumb from '@/components/breadcrumbs'
import { getUsers } from '@/components/dataFetch/userFetch'
import UserClient from '@/components/main/table/users-table/user-client'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { getServerSession } from 'next-auth'

export default async function Users({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const session = (await getServerSession(authOptions)) as CustomSession
  const users: APIResponseType<UserApiType> = await getUsers(
    session.user?.token!
  )
  const dictionary = await getDictionary(lang)
  return (
    <div className='flex-1 space-y-4  p-4 pt-6 md:p-8'>
      <BreadCrumb />
      <UserClient data={users} user={session.user!} dictionary={dictionary} />
    </div>
  )
}
