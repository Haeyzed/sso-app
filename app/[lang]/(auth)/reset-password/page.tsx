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
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function ResetPassword({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{dictionary?.resetPassword?.title}</CardTitle>
          <CardDescription>
            {dictionary?.resetPassword?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm dictionary={dictionary?.resetPassword} />
        </CardContent>
        <CardFooter>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            href='/login'
          >
            {dictionary?.resetPassword?.nav?.login}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
