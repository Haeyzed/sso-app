import ResetPasswordForm from '@/components/auth/form/ResetPasswordForm'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

export default function ResetPassword() {
  const t = useTranslations('resetPassword')

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
        <CardFooter>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            href='/login'
          >
            {t('nav.login')}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
