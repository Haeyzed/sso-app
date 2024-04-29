import RegisterLayout from '@/components/auth/form/register/RegisterLayout'
import RegisterStepper from '@/components/auth/form/register/RegisterStepper'
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

export default function Register() {
  const t = useTranslations('register')

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{t('.title')}</CardTitle>
          <CardDescription>{t('.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterStepper />
          <RegisterLayout />
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
