import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { SidebarNavItems } from '@/constants/data'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import SidebarNav from './SidebarNav'

interface SidebarProps {
  user: CustomUser
}

export default function Sidebar({ user }: SidebarProps) {
  const t = useTranslations('sidebar')
  return (
    <nav
      className={cn(
        `relative hidden h-screen w-72 border-r bg-card pt-16 lg:block`
      )}
    >
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            <h2 className='mb-2 px-4 text-xl font-semibold tracking-tight'>
              {t('title')}
            </h2>
            <SidebarNav user={user} items={SidebarNavItems} />
          </div>
        </div>
      </div>
    </nav>
  )
}
