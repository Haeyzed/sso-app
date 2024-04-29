import {
  CustomSession,
  authOptions
} from '@/app/api/auth/[...nextauth]/authOptions'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = (await getServerSession(authOptions)) as CustomSession
  if (!session || !session.user || !session.user.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return (
    <div>
      <Header user={session.user!} />
      <div className='flex h-screen overflow-hidden'>
        <Sidebar user={session.user!} />
        <main className='w-full pt-16'>{children}</main>
      </div>
    </div>
  )
}
